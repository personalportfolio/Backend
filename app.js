const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const es6Renderer = require("express-es6-template-engine");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const profileRouter = require("./routes/profile");

const resourcesRouter = require("./routes/resources");
const logEntryRouter = require("./routes/logEntry");

require("dotenv").config();

const app = express();

app.engine("html", es6Renderer);
app.set("views", "./views");
app.set("view engine", "html");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        store: new FileStore(),
        secret: 'secret message',
        resave: false,
        saveUninitialized: true,
        is_logged_in: false
    })
);

app.use(function(req, res, next) {
    if (req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico") {
        return res.sendStatus(204);
    }
    return next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/resources", resourcesRouter);
app.use("/profile", profileRouter);
app.use("/log-entry", logEntryRouter);

module.exports = app;
