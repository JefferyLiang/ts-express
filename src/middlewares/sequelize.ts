import { Sequelize, ModelCtor } from "sequelize-typescript";
import { Op } from "sequelize";
import * as fs from "fs";

interface ModelLoaderOption {
  debug: boolean;
}

const debug = require("debug")("debug:sequelize");
const aliases = {
  $not: Op.not,
  $and: Op.and,
  $lt: Op.lt,
  $gt: Op.gt,
  $lte: Op.lte,
  $gte: Op.gte,
  $like: Op.like
};

export const db = new Sequelize({
  logging: debug,
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "123456",
  database: process.env.DB_BASE || "database",
  dialect: "mysql",
  operatorsAliases: aliases
});

export class ModelLoader {
  private debug: boolean;
  private dirPath: string;
  private db: Sequelize;
  private models: { [key: string]: ModelCtor };

  constructor(
    db: Sequelize,
    dirPath: string,
    option: ModelLoaderOption = {
      debug: false
    }
  ) {
    this.db = db;
    this.dirPath = dirPath;
    this.debug = option.debug || false;
    this.models = {};
    this.load();
  }

  private load() {
    if (this.debug) {
      console.log(`[sequelize-typescript] models loading now ...`);
    }
    let files = fs.readdirSync(this.dirPath).filter(val => val.endsWith(".ts"));
    for (let file of files) {
      let module = require(`${this.dirPath}/${file}`);
      if (module.default) {
        if (this.debug) {
          console.log(
            `[sequelize-typescript] model ${file.slice(
              0,
              file.length - 3
            )} loaded.`
          );
        }
        this.models[file] = module.default;
      }
    }
    this.db.addModels(Object.values(this.models));
  }
}
