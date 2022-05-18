const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json"); // 剛剛輸出的 JSON
require("./utils/conn.js");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");


var newPostRouter = require("./routes/article");
var app = express();

process.on("uncaughtException", (err) => {
  console.error("漏洞：Uncaughted Exception");
  console.error(err);
  process.exit(1);
});

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/article", newPostRouter);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(function (req, res, next) {
  next(createError(404));
});
// 自己設定的 err 錯誤
const resErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      message: err.message,
    });
  } else {
    // log 紀錄
    console.error("出現重大錯誤", err);
    // 送出罐頭預設訊息
    res.status(500).json({
      status: "error",
      message: "系統錯誤，請恰系統管理員",
    });
  }
};
// 開發環境錯誤
const resErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

app.use(function (err, req, res, next) {
  // dev
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "dev") {
    return resErrorDev(err, res);
  }
  if (err.name === "CastError") {
    err.message = "無此 id 資料，請確認後重新輸入！";
    err.isOperational = true;
    return resErrorDev(err, res);
  }
  // production
  if (err.name === "ValidationError") {
    err.message = "資料欄位未填寫正確，請重新輸入！";
    err.isOperational = true;
    return resErrorProd(err, res);
  }

  resErrorProd(err, res);
});
/**
 * 非同步程式/未捕捉到的 catch
 */
process.on("unhandledRejection", (err, promise) => {
  console.error("漏洞：未捕捉到的 rejection：", promise, "原因：", err);
  // 記錄於 log 上
});
module.exports = app;
