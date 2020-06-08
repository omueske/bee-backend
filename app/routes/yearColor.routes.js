var expressListRoutes   = require('express-list-routes')
module.exports = app => {
    const yearColor = require("../controllers/yearColor.controller.js");
    const apiPrefix = '/api/v1/yearColor'
  
    var router = require("express").Router();
    // Retrieve a single BeeHive with id
    router.get("/:year", yearColor.showColor);

    app.use('/api/v1/yearColor', router);

    expressListRoutes({ prefix: apiPrefix }, '\nYearColor API:', router );
  };