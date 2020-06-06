module.exports = app => {
    const beeHiveLogs = require("../controllers/beehivelog.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Queen
    router.post("/", beeHiveLogs.create);
  
    // Retrieve all Queens
    router.get("/", beeHiveLogs.findAll);
  
    // Retrieve a single Queen with id
    router.get("/:id", beeHiveLogs.findOne);
  
    // Update a Queen with id
    router.put("/:id", beeHiveLogs.update);
  
    // Delete a Queens with id
    router.delete("/:id", beeHiveLogs.delete);
  
    // Create a new Queen
    router.delete("/", beeHiveLogs.deleteAll);
  
    app.use('/api/v1/beeHiveLog', router);
  };