const db = require("../models");
const BeeHiveLog = db.beeHiveLog;

// Create and Save a new BeeHiveLog
exports.create = (req, res) => {
  if (!req.body.date) {
    res.status(400).send({
      //success: 'false',
      message: "date cannot be empty",
    });
  }

  // Create an new BeeHiveLog
  const beeHiveLog = new BeeHiveLog({
    number: req.body.number,
    hatchYear: req.body.hatchYear,
    pedigree: req.body.pedigree,
    comment: req.body.comment,
  });

  // Save new BeeHiveLog to Database
  beeHiveLog
    .save(beeHiveLog)
    .then((data) => {
      res.send({
        success: "false",
        message: "BeeHiveLog saved successfully",
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error Occured while creating the BeeHiveLog",
      });
    });
};

// Retrieve all BeeHiveLogs from the database.
exports.findAll = (req, res) => {
  BeeHiveLog.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving all BeeHiveLogs",
      });
    });
};

// Find a single BeeHiveLog with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  BeeHiveLog.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found BeeHiveLog with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving BeeHiveLog with id=" + id });
    });
};

// Update a BeeHiveLog by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  BeeHiveLog.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update BeeHiveLog with id=${id}. Maybe BeeHiveLog was not found!`,
        });
      } else res.send({ message: "BeeHiveLog was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating BeeHiveLog with id=" + id,
      });
    });
};

// Delete a BeeHiveLog with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  BeeHiveLog.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete BeeHiveLog with id=${id}. Maybe BeeHiveLog was not found!`,
        });
      } else {
        res.send({
          message: "BeeHiveLog was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete BeeHiveLog with id=" + id,
      });
    });
};

// Delete all BeeHiveLogs from the database.
exports.deleteAll = (req, res) => {
  BeeHiveLog.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} BeeHiveLogs were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all BeeHiveLogs.",
      });
    });
};
