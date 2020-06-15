const db = require("../models");
const Queen = db.queens;
const logger = require("../config/winston");

// Create and Save a new Queen
logger.info("BeeHive | Create called");
exports.create = (req, res) => {
  if (!req.body.hatchYear) {
    res.status(400).send({ message: "hatchYear cannot be empty" });
    logger.error("HTTP-400 | QUEEN GET /");
  } else {
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
        logger.info("HTTP-200 | Queen created");
        res.send(data);
      })
      .catch((err) => {
        logger.error("HTTP-500 | Some error Occured while creating the Queen");
        res.status(500).send({
          message: err.message || "Some error Occured while creating the Queen",
        });
      });
  }
};

// Retrieve all Queens from the database.
exports.findAll = (req, res) => {
  Queen.find()
    .then((data) => {
      res.send(data);
      logger.info("HTTP-200 | Queens found");
    })
    .catch((err) => {
      logger.error("HTTP-500 | Some error Occured while retrieving the Queen");
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
      if (!data) {
        logger.error("HTTP-404 | Not found Queen with id " + id);
        res.status(404).send({ message: "Not found Queen with id " + id });
      } else {
        res.send(data);
        logger.info("HTTP-200 | Queen " + id + " found");
      }
    })
    .catch((err) => {
      logger.error("HTTP-500 | Error retrieving Queen with id=" + id);
      res.status(500).send({ message: "Error retrieving Queen with id=" + id });
    });
};

// Update a Queen by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  Queen.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        logger.error(
          `HTTP-404 | Cannot update Queen with id=${id}. Maybe Queen was not found!`
        );
        res.status(404).send({
          message: `Cannot update Queen with id=${id}. Maybe Queen was not found!`,
        });
      } else {
        res.send({ message: "Queen was updated successfully." });
        logger.info("HTTP-200 | Queen " + id + "updated");
      }
    })
    .catch((err) => {
      logger.error("HTTP-500 | Error updating Queen with id=" + id);
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
        logger.error(
          `HTTP-404 | Cannot delete Queen with id=${id}. Maybe Queen was not found!`
        );
        res.status(404).send({
          message: `Cannot delete Queen with id=${id}. Maybe Queen was not found!`,
        });
      } else {
        logger.info("HTTP-200 | Queen " + id + "deleted successfully");
        res.send({
          message: "Queen was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      logger.error("HTTP-500 | Could not delete Queen with id=" + id);
      res.status(500).send({
        message: "Could not delete Queen with id=" + id,
      });
    });
};

// Delete all Queens from the database.
exports.deleteAll = (req, res) => {
  Queen.deleteMany({})
    .then((data) => {
      logger.info(
        `HTTP-200 | ${data.deletedCount} Queens were deleted successfully!`
      );
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
