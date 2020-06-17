import * as http from "http";
import { app } from "./app";
import { normalizePort } from "./utils/http";
const debug = require("debug")("debug:http");

let port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

let server = http.createServer(app);
server.listen(app.get("port"));
server.on("error", onError);
server.on("listening", onListening);

function onListening() {
  let addr = server.address();
  let bind =
    typeof addr === "string"
      ? `pipe ${addr}`
      : `port ${addr ? addr.port : "Null"}`;
  debug(`Listening on ${bind}`);
}

function onError(error: any) {
  if (error.syscall !== "listen") throw error;

  let bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`${bind} is already in use.`);
      process.exit(1);
    default:
      throw error;
  }
}
