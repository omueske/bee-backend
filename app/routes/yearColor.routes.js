module.exports = app => {
    const yearColor = require("../controllers/yearColor.controller.js");
  
    var router = require("express").Router();
    // Retrieve a single BeeHive with id
    router.get("/:year", yearColor.showColor);

    app.use('/api/v1/yearColor', router);
  };