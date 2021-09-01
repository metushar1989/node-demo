import express from "express";
import { connect } from "./config/db";
import { devConfig } from "./config/env";
import { restRouter } from "./resources";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";

const app = express();
connect();

app.use(
  express.json({
    limit: "10mb",
  })
);
app.use(
  express.urlencoded({
    limit: "10mb",
    extended: true,
  })
);

app.use(
  morgan("combined", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
    stream: fs.createWriteStream("./access.log", {
      flags: "a",
    }),
  })
);

// Providing CORS Policy
app.use(
  cors({
    origin: "*",
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use("/api", restRouter);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.message = "Invalid route";
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    error: {
      message: error.message,
    },
  });
});


app.listen(devConfig.PORT, () => {
  console.log(`Server is running at PORT http://localhost:${devConfig.PORT}/`);
});
module.exports = app;
