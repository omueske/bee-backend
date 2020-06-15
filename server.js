const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  //origin: "http://localhost:8080"
  origin: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

require("./app/routes/beehives.routes")(app);
require("./app/routes/queens.routes")(app);
require("./app/routes/hivelogs.routes")(app);
require("./app/routes/yearColor.routes")(app);
require("./app/routes/locations.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
