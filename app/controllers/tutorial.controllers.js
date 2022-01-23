// Inside app/controllers folder, let’s create tutorial.controller.js with these CRUD functions:

// create
// findAll
// findOne
// update
// delete
// deleteAll
// findAllPublished

const res = require("express/lib/response");
const db = require("../models");
const Tutorials = db.tutorials;

//Create and save new tutorial

exports.create = (req, res) => {
    //validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty" });
        return;
    }
    //Create tutorial
    const tutorial = new Tutorials({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });
    //save tutorial in the database
    tutorial
        .save(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the tutorial...!!"
            });
        });
};

// Retrieve all tutorials from the database

exports.findAll = (req, res) => {
    const title = req.query.title; //use req.query.title to get query string from the Request and consider it as   condition for findAll() method.
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } :

        Tutorials.find(condition)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    messsage:
                        err.message || "Some error occured while retrieving data"
                });
            });
};

// Find a single tutorial with an id

exports.findOne = (req, res) => {
    const id = req.params.id;
    Tutorials.findByID(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not Found any Tutorial with id" + id });
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving Tutorial with ID=" + id });
        });
};

// Update tutorial by id

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty..!!"
        });
    }

    const id = req.params.id;

    Tutorials.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `cannot update Tutorial with id=${id}. May be Tutorial was not found`
                });
            } else res.send({ message: "Tutorial was updated successfully" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updateing Tutorial with id=" + id
            });
        });

};

// Delete specific id's tutorial

exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorials.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(400).send({
                    message: `Cannot delete tutorial with id=${id}. May be tutorial is not found`
                });
            } else {
                res.send({
                    message: "Tutorial was deleted Successfully"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete tutorial with id=" + id
            });
        });


};

// Delete all tutorial

exports.deleteAll = (req, res) => {
    Tutorials.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Tutorials were deleted successfully`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials"
            });
        });
};
// Find all published tutorial

exports.findAllPublished = (req, res) => {
    Tutorials.find({ puhblished: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the tutorials..!!"
            });
        });
};
