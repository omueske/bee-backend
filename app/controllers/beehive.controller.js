const db = require("../models");
const BeeHive = db.beehives

// Create and Save a new BeeHive
exports.create = (req, res) => {
  if (!req.body.buildType) {
    res.status(400).send({ message: "buildType cannot be empty" });
  }

  // Create an new BeeHive
  const beeHive = new BeeHive({
    name: req.body.name,
    buildType: req.body.buildType,
    sections: req.body.sections,
    hiveLog: req.body.hivelog,
    todos: req.body.todos,
    comment: req.body.comment,
  });

  console.log(beeHive)

  // Save new BeeHive to Database
  beeHive
    .save(beeHive)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error Occured while creating the BeeHive",
      });
    });
};

// Retrieve all BeeHives from the database.
exports.findAll = (req, res) => {
  BeeHive.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving all BeeHivess",
      });
    });
};

// Find a single BeeHive with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  BeeHive.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found BeeHive with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving BeeHive with id=" + id });
    });
};

// Update a BeeHive by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  BeeHive.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update BeeHive with id=${id}. Maybe BeeHive was not found!`,
        });
      } else res.send({ message: "BeeHive was updated successfully.", data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating BeeHive with id=" + id,
      });
    });
};

// Delete a BeeHive with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  BeeHive.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete BeeHive with id=${id}. Maybe BeeHive was not found!`,
        });
      } else {
        res.send({
          message: "BeeHive was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete BeeHive with id=" + id,
      });
    });
};

// Delete all BeeHives from the database.
exports.deleteAll = (req, res) => {
  BeeHive.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} BeeHives were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all BeeHives.",
      });
    });
};
