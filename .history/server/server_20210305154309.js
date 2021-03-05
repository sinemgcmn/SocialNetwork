const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        //if the user is logged in they are not allowed to see the welcome page
        //so we redirect them away from /welcome and towards /, a page they are allowed to see
        res.redirect("/");
    } else {
        //send back HTML which will then trigger start.js to render Welcome in DOM
        res.sendFile(path.join(_dirname, "..", "client", "index.html"));
    }
});

app.get("*", function (req, res) {
    if (req.session.userId) {
        //if the user is logged in they are not allowed to see the welcome page
        //so we redirect them away from /welcome and towards /, a page they are allowed to see
        res.redirect("/");
    } else {
        //send back HTML which will then trigger start.js to render Welcome in DOM
        res.sendFile(path.join(_dirname, "..", "client", "index.html"));
    }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
