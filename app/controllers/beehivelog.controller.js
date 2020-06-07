const db = require("../models");
const { v4: uuidv4 } = require("uuid");
const BeeHive = db.beehives;

// Create and Save a new BeeHiveLog
exports.create = (req, res) => {
  if (!req.body.date) {
    res.status(400).send({
      //success: 'false',
      message: "date cannot be empty",
    });
  }

  if (!req.body.hiveId) {
    res.status(400).send({
      //success: 'false',
      message: "hiveId cannot be empty",
    });
  }
  const hiveLog = {
    logId: uuidv4(),
    date: req.body.date,
    findings: req.body.findings,
    frames: req.body.frames,
    food: req.body.food,
    meekness: req.body.meekness,
    comment: req.body.comment,
  };

  BeeHive.findOneAndUpdate(
    { _id: id },
    { $push: { hiveLog: hiveLog } },
    { new: true },
    function (err, update) {
      if (err) {
        return res.status(500).json({
          status: "error",
          result: "server error",
        });
      } else {
        return res.status(200).json({
          status: "ok",
          result: "Hivelog added successfully",
          hiveLog,
        });
      }
    }
  );
};

exports.findAll = (req, res) => {
// Find all Hivelogs from
  const id = req.params.id;

  BeeHive.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found BeeHive with id " + id });
      else{
        let hivelog = data.hiveLog
        res.status(200).send({ message: "success", hivelog });
      } 
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving BeeHive with id=" + id });
    });
  }

// Update a BeeHiveLog by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const logId = req.params.logId;
  console.log(logId);
  console.log(req.body);
  BeeHive.findOneAndUpdate({ "hiveLog.logId": logId }, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update BeeHiveLog with id=${logId}. Maybe BeeHiveLog was not found!`,
        });
      } else res.send({ message: "BeeHiveLog was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating BeeHiveLog with id=" + logId,
      });
    });
};

// Delete a BeeHiveLog with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  BeeHive.findByIdAndRemove(id)
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
  BeeHive.deleteMany({})
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
