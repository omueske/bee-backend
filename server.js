const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const logger = require("./app/config/log4js");

//
// Logging
//
logger.info("Setting CORS-Options to '*'");

var corsOptions = {
  //origin: "http://localhost:8080"
  origin: "*",
};
app.use(cors(corsOptions));

logger.info("Setting parsing for Content-type applicaion/json");
// parse requests of content-type - application/json
app.use(bodyParser.json());

logger.info(
  "Setting parsing for Content-type applicaion/x-www-form-urlencoded"
);
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

logger.info("Initializing MongoDB-Connect");
const db = require("./app/models");

logger.info("Setting up Express-Routes");
require("./app/routes/beehives.routes")(app);
require("./app/routes/queens.routes")(app);
require("./app/routes/hivelogs.routes")(app);
require("./app/routes/yearColor.routes")(app);
require("./app/routes/locations.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
});
