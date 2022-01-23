// We are going to define Routes.

const { route } = require("express/lib/application");

//Routes means  When a client sends request for an endpoint using HTTP request (GET, POST, PUT, DELETE), we need to determine how the server will reponse by setting up the routes.

// These are our routes:

// /api/tutorials: GET, POST, DELETE
// /api/tutorials/:id: GET, PUT, DELETE
// /api/tutorials/published: GET

module.exports= app => {
    const tutorials = require("../controllers/tutorial.controllers.js");
    
    var router = require("express").Router();

    //Create a new tutorial
    router.post("/",tutorials.create);
    //Retrieve all tutorials
    router.get("/",tutorials.findAll);
    //Retrieve all published tutorials
    router.get("/published",tutorials.findAllPublished);
    //Retrieve a Single Tutorial with id
    router.get("/:id",tutorials.findOne);
    //Update a Tutorial with id
    router.put("/:id",tutorials.update);
    //Delete a Tutorial with id
    router.delete("/:id",tutorials.delete);
    //Delete all tutorial
    router.delete("/",tutorials.deleteAll);
    app.use('/api/tutorials',router);
};