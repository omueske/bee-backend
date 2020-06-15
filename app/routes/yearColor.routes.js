var expressListRoutes = require("express-list-routes");
module.exports = (app) => {
  const yearColor = require("../controllers/yearColor.controller.js");
  const logger = require("../config/winston");
  const apiPrefix = "/api/v1/yearColor";

  logger.info("Create YearColor for Queen API");
  var router = require("express").Router();
  // Retrieve a single BeeHive with id
  router.get("/:year", yearColor.showColor);

  app.use("/api/v1/yearColor", router);

  logger.info(
    expressListRoutes({ prefix: apiPrefix }, "\nYearColor API:", router)
  );
};
