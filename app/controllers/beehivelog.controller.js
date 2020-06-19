const db = require("../models");
const { v4: uuidv4 } = require("uuid");
const BeeHiveLog = db.beehiveLogs;
const logger = require("../config/log4js");

// Create and Save a new BeeHiveLog
exports.create = (req, res) => {
  if (!req.body.date) {
    logger.error("HTTP-400: Date cannot be empty");
    res.status(400).send({
      success: "false",
      message: "date cannot be empty",
    });
  }

  if (!req.params.hiveId) {
    logger.error("HTTP-400: hiveId cannot be empty");
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
      logger.info("HTTP-200: BeeHiveLog created", logger.debug(data));
      res.send(data);
    })
    .catch((err) => {
      logger.error(
        "HTTP-500: Some error Occured while creating the BeeHiveLog"
      );
      res.status(500).send({
        message:
          err.message || "Some error Occured while creating the BeeHiveLog",
      });
    });
};

exports.findAll = (req, res) => {
  BeeHiveLog.find()
    .then((data) => {
      logger.info("HTTP-200: BeeHiveLog created");
      logger.debug(data);
      res.send(data);
    })
    .catch((err) => {
      logger.error(
        "HTTP-500: Some error occured while retrieving all BeeHivesLogs"
      );
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving all BeeHivesLogs",
      });
    });
};

exports.findAllFromHive = (req, res) => {
  if (!req.params.hiveId) {
    logger.error("HTTP-400: hiveId cannot be empty");
    res.status(400).send({
      //success: 'false',
      message: "hiveId cannot be empty",
    });
  }
  BeeHiveLog.find({ hiveId: req.params.hiveId })
    .then((data) => {
      logger.info(
        "HTTP-200: all BeeHiveLogs for Hive " + req.params.hiveId + "found"
      );
      logger.debug(data);
      res.send(data);
    })
    .catch((err) => {
      logger.error(
        "HTTP-500:Some error occured while retrieving all BeeHivesLogs from HiveID: " +
          req.params.hiveId +
          "."
      );
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while retrieving all BeeHivesLogs from HiveID: " +
            req.params.hiveId +
            ".",
      });
    });
};

// Find a single BeeHiveLog with an id
exports.findOne = (req, res) => {
  if (!req.params.id) {
    logger.error("HTTP-400:id cannot be empty");
    res.status(400).send({
      //success: 'false',
      message: "id cannot be empty",
    });
  }
  const id = req.params.id;

  BeeHiveLog.findById(id)
    .then((data) => {
      if (!data) {
        logger.error("HTTP-400: Not found BeeHiveLog with id=" + id);
        res.status(404).send({ message: "Not found BeeHiveLog with id=" + id });
      } else {
        res.send(data);
        logger.info(
          "HTTP-200: BeeHiveLog with id= " + req.params.hiveId + "found"
        );
        logger.debug(data);
      }
    })
    .catch((err) => {
      logger.error("HTTP-400: Error retrieving BeeHiveLog with id=" + id);
      res
        .status(500)
        .send({ message: "Error retrieving BeeHiveLog with id=" + id });
    });
};

// Update a BeeHiveLog by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    logger.error("HTTP-400: Data to update can not be empty!");
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  BeeHiveLog.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        logger.error(
          `HTTP-404: Cannot update BeeHiveLog with id=${id}. Maybe BeeHive was not found!`
        );
        res.status(404).send({
          message: `Cannot update BeeHiveLog with id=${id}. Maybe BeeHive was not found!`,
        });
      } else {
        res.send({ message: "BeeHive was updated successfully.", data });
        logger.info(
          "HTTP-200: BeeHiveLog with id= " +
            req.params.hiveId +
            " updated successfully"
        );
        logger.debug(data);
      }
    })
    .catch((err) => {
      logger.error(`HTTP-500: Error updating BeeHiveLog with id=${id}.`);
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
        logger.error(
          `HTTP-404: Cannot delete BeeHiveLog with id=${id}. Maybe BeeHive was not found!.`
        );
        res.status(404).send({
          message: `Cannot delete BeeHiveLog with id=${id}. Maybe BeeHive was not found!`,
        });
      } else {
        logger.info(`HTTP-200: BeeHiveLog with id=${id} found and deleted.`);
        logger.debug(data);
        res.send({
          message: "BeeHiveLog was deleted successfully!",
          data,
        });
      }
    })
    .catch((err) => {
      logger.error("HTTP-500: Could not delete BeeHive with id=" + id);
      res.status(500).send({
        message: "Could not delete BeeHive with id=" + id,
      });
    });
};
