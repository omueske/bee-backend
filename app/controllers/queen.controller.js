const db = require("../models");
const Queen = db.queens;

// Create and Save a new Queen
exports.create = (req, res) => {
  if (!req.body.hatchYear) {
    res.status(400).send({ message: "hatchYear cannot be empty" });
  }

  // Create an new Queen
  const queen = new Queen({
    number: req.body.number,
    hatchYear: req.body.hatchYear,
    pedigree: req.body.pedigree,
    comment: req.body.comment,
  });

  // Save new Queen to Database
  queen
    .save(queen)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error Occured while creating the Queen",
      });
    });
};

// Retrieve all Queens from the database.
exports.findAll = (req, res) => {
  Queen.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving all Queenss",
      });
    });
};

// Find a single Queen with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Queen.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Queen with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Queen with id=" + id });
    });
};

// Update a Queen by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  Queen.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Queen with id=${id}. Maybe Queen was not found!`,
        });
      } else res.send({ message: "Queen was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Queen with id=" + id,
      });
    });
};

// Delete a Queen with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Queen.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Queen with id=${id}. Maybe Queen was not found!`,
        });
      } else {
        res.send({
          message: "Queen was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Queen with id=" + id,
      });
    });
};

// Delete all Queens from the database.
exports.deleteAll = (req, res) => {
  Queen.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Queens were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Queens.",
      });
    });
};
