module.exports = app => {
    const beehives = require("../controllers/beehive.controller.js");
  
    var router = require("express").Router();
  
    // Create a new BeeHive
    router.post("/", beehives.create);
  
    // Retrieve all BeeHives
    router.get("/", beehives.findAll);
  
    // Retrieve a single BeeHive with id
    router.get("/:id", beehives.findOne);
  
    // Update a BeeHive with id
    router.put("/:id", beehives.update);
  
    // Delete a BeeHive with id
    router.delete("/:id", beehives.delete);
  
    // Create a new BeeHive
    router.delete("/", beehives.deleteAll);
  
    app.use('/api/v1/hives', router);
  };