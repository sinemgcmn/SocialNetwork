const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");
const { hash, compare } = require("./utils/bc.js");
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

// req.session.userId = rows[0].id;
// res.redirect("/");
