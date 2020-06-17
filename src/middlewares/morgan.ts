import * as morgan from "morgan";
import { IRequest, IResponse } from "../const/interface";
import * as dayjs from "dayjs";

export default morgan((tokens, req: IRequest, res: IResponse) => {
  return [
    `[${dayjs().format("YYYY-MM-DD HH:mm:ss")}]`,
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    `[length: ${tokens.res(req, res, "content-length")}]`,
    "-",
    `'${tokens["response-time"](req, res)} ms'`
    // "[",
    // req.headers["user-agent"],
    // req.headers["referer"],
    // req.headers["x-real-ip"],
    // "]"
  ].join(" ");
});
