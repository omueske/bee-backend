const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");


const db = {};
db.url = dbConfig.url;
db.beehives = require("./beehive.model.js")(mongoose)
db.queens = require("./queen.model.js")(mongoose)
db.locations = require("./location.model")(mongoose)


mongoose.Promise = global.Promise;

mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

module.exports =  db
