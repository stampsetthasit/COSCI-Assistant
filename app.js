const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const indexRouter = require("./routes/index");
const richMenuRouter = require("./routes/richmenu");
const lineRouter = require("./routes/line");
const broadcastRouter = require("./routes/broadcast");
const notifyRouter = require("./routes/notify");

const app = express();

const origin = "*";
const corsOptions = {
  origin: origin,
  credentials: true,
  methods: "GET, POST, PUT, PATCH, DELETE",
};
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(cors(corsOptions));

app.use("/line", lineRouter);

app.use(logger("dev"));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/richmenu", richMenuRouter);
app.use("/broadcast", broadcastRouter);
app.use("/notify", notifyRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
});

module.exports = app;
