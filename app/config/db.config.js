const logger = require("../config/log4js");
const url = "mongodb://localhost:27017/beeManager";
logger.info("DB-URL: " + url);
module.exports = {
  url,
};
