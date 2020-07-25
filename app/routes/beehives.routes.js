var expressListRoutes = require("express-list-routes");
module.exports = (app) => {
  const beehives = require("../controllers/beehive.controller.js");
  const apiPrefix = "/api/v1/hives";
  const logger = require("../config/log4js");

  var router = require("express").Router();

  logger.info("Create Route for BeeHive API");
  // Create a new BeeHive
  router.post("/", beehives.create);

  // Retrieve all BeeHives
  router.get("/", beehives.findAll);

  // Retrieve a single BeeHive with id
  router.get("/:id", beehives.findOne);

  // Update a BeeHive with id
  router.put("/:id", beehives.update);

  // Add a Queen to Hives
  router.put("/queen/:hiveId", beehives.createQueen);

  // Delete a BeeHive with id
  router.delete("/:id", beehives.delete);

  // Delete Queen from BeeHive with BeeHive
  router.delete("/queen/:queenId", beehives.unLinkQueen);

  // Delete all Hives
  // router.delete("/", beehives.deleteAll);

  // Move Queen to another Hives
  router.patch("/queen/:queenId/:hiveId", beehives.moveQueen);

  app.use("/api/v1/hives", router);

  logger.info(expressListRoutes({ prefix: apiPrefix }, "\nHives API:", router));
};
