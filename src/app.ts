import * as Express from "express";
import * as bodyParser from "body-parser";
import * as timeout from "connect-timeout";
import * as cors from "cors";
import morgan from "./middlewares/morgan";
import IError from "./utils/IError";

export const app = Express();

app.use(morgan);
app.use(timeout("10s"));

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

app.use(
  bodyParser.json({
    strict: false
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (req, res, next) => {
  res.end("Hello express with typescript");
});

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
      res.end({
        code: err.err_code,
        message: err.message
      });
    } else {
      res.status(500);
      res.end({
        code: 500,
        message: err.message
      });
    }
  }
);
