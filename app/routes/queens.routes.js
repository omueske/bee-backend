var expressListRoutes   = require('express-list-routes')
module.exports = app => {
    const queens = require("../controllers/queen.controller.js");
    const apiPrefix = '/api/v1/queens'
  
    var router = require("express").Router();
  
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
  
    // Create a new Queen
    router.delete("/", queens.deleteAll);
  
    app.use('/api/v1/queens', router);
    expressListRoutes({ prefix: apiPrefix }, '\nQueens API:', router );
  };