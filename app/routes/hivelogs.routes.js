var expressListRoutes   = require('express-list-routes')
module.exports = app => {
    const apiPrefix = '/api/v1/beeHiveLog'
    const beeHiveLogs = require("../controllers/beehivelog.controller.js");
  
    var router = require("express").Router();
  
    // Create a new HiveLog
    router.post("/:hiveId", beeHiveLogs.create);
  
    //Retrieve all HiveLogs from an Hive
    router.get("/:id", beeHiveLogs.findAll);
  
    // Update a HiveLog with id
    router.put("/:logId", beeHiveLogs.update);
  
    // Delete a HiveLogs with id
    router.delete("/:id", beeHiveLogs.delete);
  
    app.use('/api/v1/beeHiveLog', router);

     expressListRoutes({ prefix: apiPrefix }, '\nHivelogs API:', router );
  };