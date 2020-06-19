const dbConfig = require("../config/db.config.js");
const logger = require("../config/log4js");
const mongoose = require("mongoose");
const db = {};

db.url = dbConfig.url;
db.beehives = require("./beehive.model.js")(mongoose);
db.beehiveLogs = require("./beehivelog.model")(mongoose);
db.queens = require("./queen.model.js")(mongoose);
db.locations = require("./location.model")(mongoose);

mongoose.Promise = global.Promise;

mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to the database!");
  })
  .catch((err) => {
    logger.err("Cannot connect to the database!", err);
    process.exit();
  });

module.exports = db;
