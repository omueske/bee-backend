var expressListRoutes   = require('express-list-routes')
module.exports = app => {
    const apiPrefix = '/api/v1/beeHiveLog'
    const beeHiveLogs = require("../controllers/beehivelog.controller.js");
  
    var router = require("express").Router();
  
    // Create a new HiveLog
    router.post("/:hiveId", beeHiveLogs.create);
  
    //Retrieve all HiveLogs
    router.get("/", beeHiveLogs.findAll);

    // Retrieve specific HiveLog
    router.get("/:id", beeHiveLogs.findOne);

    // Retrieve alle Hivelogs from specific Hive
    router.get("/hive/:hiveId", beeHiveLogs.findAllFromHive)
  
    // Update a HiveLog with id
    router.put("/:id", beeHiveLogs.update);
  
    // Delete a HiveLogs with id
    router.delete("/:id", beeHiveLogs.delete);
  
    app.use('/api/v1/beeHiveLog', router);

     expressListRoutes({ prefix: apiPrefix }, '\nHivelogs API:', router );
  };