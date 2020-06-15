var expressListRoutes = require("express-list-routes");
module.exports = (app) => {
  const locations = require("../controllers/location.controller.js");
  const apiPrefix = "/api/v1/locations";
  const logger = require("../config/winston");
  var router = require("express").Router();

  logger.info("Create Route for Location API");
  // Create a new Location
  router.post("/", locations.create);

  // Retrieve all Locations
  router.get("/", locations.findAll);

  // Retrieve a single Location with id
  router.get("/:id", locations.findOne);

  // Update a Location with id
  router.put("/:id", locations.update);

  // Delete a Location with id
  router.delete("/:id", locations.delete);

  // Link Hive to Location
  router.link("/:locId/:hiveId", locations.linkBeeHive);

  // Unlink Hive from Location
  router.unlink("/:hiveId", locations.unLinkBeeHive);

  app.use("/api/v1/locations", router);

  logger.info(
    expressListRoutes({ prefix: apiPrefix }, "\nLocations API:", router)
  );
};
