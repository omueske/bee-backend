const db = require("../models");
const { v4: uuidv4 } = require("uuid");
const BeeHiveLog = db.beehiveLogs;

// Create and Save a new BeeHiveLog
exports.create = (req, res) => {
  if (!req.body.date) {
    res.status(400).send({
      success: "false",
      message: "date cannot be empty",
    });
  }

  if (!req.params.hiveId) {
    res.status(400).send({
      success: "false",
      message: "hiveId cannot be empty",
    });
  }

  const beeHiveLog = new BeeHiveLog({
    logId: uuidv4(),
    date: req.body.date,
    findings: req.body.findings,
    frames: req.body.frames,
    food: req.body.food,
    meekness: req.body.meekness,
    comment: req.body.comment,
    hiveId: req.body.hiveId,
    queen: req.body.queen,
  });

  beeHiveLog
    .save(beeHiveLog)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error Occured while creating the BeeHive",
      });
    });
};

exports.findAll = (req, res) => {
  BeeHiveLog.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving all BeeHivesLogs",
      });
    });
};

exports.findAllFromHive = (req, res) => {
  if (!req.params.hiveId) {
    res.status(400).send({
      //success: 'false',
      message: "hiveId cannot be empty",
    });
  }
  BeeHiveLog.find({ hiveId: req.params.hiveId })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while retrieving all BeeHivesLogs from HiveID: " +
            req -
            params.hiveId +
            ".",
      });
    });
};

// Find a single BeeHiveLog with an id
exports.findOne = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      //success: 'false',
      message: "id cannot be empty",
    });
  }
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
          message: `Cannot update BeeHiveLog with id=${id}. Maybe BeeHive was not found!`,
        });
      } else res.send({ message: "BeeHive was updated successfully.", data });
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
          message: `Cannot delete BeeHiveLog with id=${id}. Maybe BeeHive was not found!`,
        });
      } else {
        res.send({
          message: "BeeHive was deleted successfully!",
          data,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete BeeHive with id=" + id,
      });
    });
};
