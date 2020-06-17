const config = require("../../db.config");

module.exports = {
  development: {
    username: config.user,
    password: config.password,
    database: config.database,
    host: config.host,
    dialect: "mysql"
  },
  production: {
    username: config.user,
    password: config.password,
    database: config.database,
    host: config.host,
    dialect: "mysql"
  }
};
