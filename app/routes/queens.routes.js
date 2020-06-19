var expressListRoutes = require("express-list-routes");
module.exports = (app) => {
  const queens = require("../controllers/queen.controller.js");
  const apiPrefix = "/api/v1/queens";
  const logger = require("../config/log4js");

  var router = require("express").Router();

  logger.info("Create Route for Queen API");
  // Create a new Queen
  router.post("/", queens.create);

  // Retrieve all Queens
  router.get("/", queens.findAll);

  // Retrieve a single Queen with id
  router.get("/:id", queens.findOne);

  // Update a Queen with id
  router.put("/:id", queens.update);

  // Delete a Queens with id
  router.delete("/:id", queens.delete);

  // Delete all Queens
  // router.delete("/", queens.deleteAll);

  app.use("/api/v1/queens", router);
  logger.info(
    expressListRoutes({ prefix: apiPrefix }, "\nQueens API:", router)
  );
};
