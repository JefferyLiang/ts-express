import * as Express from "express";
import * as bodyParser from "body-parser";
import * as timeout from "connect-timeout";
import * as cors from "cors";
import * as path from "path";
import morgan from "./middlewares/morgan";
import IError from "./utils/IError";
import { db, ModelLoader } from "./middlewares/sequelize";
import { ExpressApp, ControllerLoader } from "express-ts-decorator";

@ControllerLoader({
  debug: process.env.NODE_ENV === "development",
  filePath: path.join(__dirname, "./controllers"),
  autoInjectRoutes: true
})
class App extends ExpressApp {
  beforeRouterInjectMiddlewares = [
    morgan,
    timeout("10s"),
    {
      active: process.env.NODE_ENV === "development",
      middleware: cors()
    },
    bodyParser.json({
      strict: false
    }),
    bodyParser.urlencoded({
      extended: true
    })
  ];
  constructor() {
    super(Express());
    new ModelLoader(db, path.join(__dirname, "./models"), {
      debug: process.env.NODE_ENV === "development"
    });
  }
}

const app = new App();

app.use(
  (
    err: IError | Error,
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    // debug logger
    const debug = require("debug")("debug:error");
    debug(JSON.stringify(err));

    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    if (err instanceof IError) {
      res.status(err.status || 500);
      res.json({
        code: err.err_code,
        message: err.message
      });
    } else {
      res.status(500);
      res.json({
        code: 500,
        message: err.message
      });
    }
  }
);

export const express = app.express;
