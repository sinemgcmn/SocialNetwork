const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db");
const ses = require("./ses");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const config = require("./config");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

app.use(express.static("public"));

const { hash, compare } = require("./utils/bc.js");
const cryptoRandomString = require("crypto-random-string");
const cookieSession = require("cookie-session");
const csurf = require("csurf");

//Cookie Middleware
app.use(
    cookieSession({
        secret: `wingardium leviosa`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

//express.json() is a method inbuilt in express
//to recognize the incoming Request Object as a JSON Object.
app.use(express.json());

//Through the use of this compression,
//we can improve the performance of our Node.js applications as our payload size is reduced drastically.
app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

///////////////Routes///////////////////////////

app.get("/welcome", (req, res) => {
    // is going to run if the user puts /welcome in the url bar
    if (req.session.userId) {
        // if the user is logged in, they are NOT allowed to see the welcome page
        // so we redirect them away from /welcome and towards /, a page they're allowed to see
        res.redirect("/");
    } else {
        // send back HTML, which will then trigger start.js to render Welcome in DOM
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.post("/registration", (req, res) => {
    const { first, last, email, password } = req.body;
    if (first && last && email && password) {
        hash(password).then((hashedPassword) => {
            db.userInputForReg(first, last, email, hashedPassword).then(
                ({ rows }) => {
                    // console.log(rows);
                    req.session.userId = rows[0].id;
                    res.json({
                        success: true,
                    });
                }
            );
        });
    } else {
        res.json({
            success: false,
        });
    }
});

app.post("/login", (req, res) => {
    const { password, email } = req.body;
    if (email && password) {
        db.userInputForLog(email).then(({ rows }) => {
            console.log(rows);
            if (rows.length === 0) {
                res.json({
                    success: false,
                });
            } else if (rows) {
                compare(password, rows[0].password_hash).then((match) => {
                    if (match) {
                        req.session.userId = rows[0].id;
                        res.json({
                            success: true,
                        });
                    } else {
                        res.json({
                            success: false,
                        });
                    }
                });
            }
        });
    } else {
        res.json({
            success: false,
        });
    }
});

app.post("/reset/start", (req, res) => {
    const { email } = req.body;
    if (email) {
        db.userInputForLog(email).then(({ rows }) => {
            // console.log(rows);
            if (rows.length === 0) {
                res.json({
                    success: false,
                });
            } else if (rows) {
                // console.log("it is matched");
                // console.log(rows);
                const secretCode = cryptoRandomString({ length: 6 });
                // console.log(secretCode);
                db.userInputForReset(email, secretCode).then(({ rows }) => {
                    // console.log(rows);
                    ses.sendEmail(
                        email,
                        secretCode,
                        "Here is your security code to reset your password!"
                    );
                    res.json({
                        success: true,
                    });
                });
            }
        });
    } else {
        res.json({
            success: false,
        });
    }
});

app.post("/reset/verify", (req, res) => {
    const { secretCode, password, email } = req.body;
    // console.log("req.body.code", req.body.code);
    db.userCodeForReset(secretCode).then(({ rows }) => {
        // console.log("rows:", rows);
        if (rows.length === 0) {
            res.json({
                success: false,
            });
        } else if (rows) {
            if (req.body.code === rows[0].secret_code) {
                // console.log("rows[0].secret_code", rows[0].secret_code);
                // console.log("req.body.code", req.body.code);
                // console.log("i am true");
                hash(req.body.password).then((hashedPassword) => {
                    // console.log(req.body.password);
                    // console.log(hashedPassword);
                    // console.log(email);
                    db.selectFromResetCode(req.body.code).then(({ rows }) => {
                        // console.log("selectFromResetCode", rows);
                        db.updatePassword(rows[0].email, hashedPassword);
                        console.log("I am hashed");
                        res.json({
                            success: true,
                        });
                    });
                });
            }
        }
    });
});

app.get("/user", (req, res) => {
    const userId = req.session.userId;
    // console.log("req.session.userId:", userId);
    // console.log("userId:", userId);
    if (req.session.userId) {
        // console.log("I am here");
        db.selectUserInputForPic(userId).then(({ rows }) => {
            // console.log(rows);
            res.json({
                success: rows,
            });
        });
    }
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const userId = req.session.userId;
    const { filename } = req.file;
    const url = config.s3Url + filename;
    if (req.session.userId) {
        db.selectUserInputForPic(userId).then(({ rows }) => {
            // console.log("selectUserInputForPic", rows[0].id);
            if (req.file) {
                db.updatePic(rows[0].id, url).then((result) => {
                    console.log(result.rows);
                    res.json(result.rows[0]);
                });
                // console.log("rowupdatePics:", rows);
            } else {
                res.json({
                    success: false,
                });
            }
        });
    }
});

app.post("/bio", (req, res) => {
    // console.log("I am coming from server");
    const { bioDraft } = req.body;
    // console.log(req.body);
    const userId = req.session.userId;
    if (req.session.userId) {
        db.updateBioInfo(userId, bioDraft);
        res.json({
            success: true,
        });
    } else {
        res.json({
            success: false,
        });
    }
});

app.post("/otherUsers", (req, res) => {
    const userId = req.body.id;
    if (userId == req.session.userId) {
        res.json({
            success: false,
        });
    } else {
        db.selectUserInputForPic(userId).then((result) => {
            // console.log("selectUserInputForPic", result);
            // console.log(result.rows);
            res.json(result.rows[0]);
        });
    }
});

app.get("/api/users/most-recent", (req, res) => {
    db.resultUsers().then(({ rows }) => {
        console.log(rows);
        res.json({
            success: rows,
        });
    });
});

app.get("/api/users/:searchterm", (req, res) => {
    // console.log("I am coming from server");
    const searchterm = req.params.searchterm;
    // console.log(req.body);
    db.filterUsers(searchterm).then(({ rows }) => {
        // console.log(rows);
        res.json({
            success: rows,
        });
    });
});

app.get("/api/user/:id", (req, res) => {
    const loggedInUser = req.session.userId;
    // console.log("loggedInUser", loggedInUser);
    const otherUser = req.params.id;
    // console.log("otherUser", otherUser);
    db.selectFriendship(otherUser, loggedInUser).then(({ rows }) => {
        // console.log("selectFriendship-rows", rows);
        res.json({
            success: rows,
        });
    });
});

app.post("/api/user/:id", (req, res) => {
    const { btnTxt } = req.body;
    console.log("btnTxt", btnTxt);
    const loggedInUser = req.session.userId;
    // console.log("loggedInUser", loggedInUser);
    const otherUser = req.params.id;
    // console.log("otherUser", otherUser);
    if (btnTxt == "Make Friend Request") {
        db.insertFriendInfo(loggedInUser, otherUser).then(({ rows }) => {
            console.log("insertFriendInfo", rows);
            res.json({
                success: "Cancel Friend Request",
            });
        });
    }
    if (btnTxt == "Cancel Friend Request" || btnTxt == "End Friendship") {
        db.selectFriendship(loggedInUser, otherUser).then(({ rows }) => {
            console.log("delete", rows);
            db.deleteFriendInfo(rows[0].id);
            res.json({
                success: "Make Friend Request",
            });
        });
    }
    if (btnTxt == "Accept Friend Request") {
        db.selectFriendship(loggedInUser, otherUser).then(({ rows }) => {
            console.log("update", rows[0].id, rows[0].accepted);
            rows[0].accepted = true;
            db.updateAcceptedInfo(rows[0].id, rows[0].accepted);
            console.log("update", rows[0].id, rows[0].accepted);
            res.json({
                success: "End Friendship",
            });
        });
    }
});

app.get("*", function (req, res) {
    // runs if the user goes to literally any route except /welcome
    if (!req.session.userId) {
        // if the user is NOT logged in, redirect them to /welcome, which is the only page
        // they're allowed to see
        res.redirect("/welcome");
    } else {
        // this runs if the user is logged in
        // in which case send back the HTML, after which start js kicks in and renders our p tag...
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
