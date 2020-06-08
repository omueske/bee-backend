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

  if (!req.params.hiveId) {
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
  const id = req.params.hiveId;
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
      else {
        let hivelog = data.hiveLog;
        res.status(200).send({ message: "success", hivelog });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving BeeHive with id=" + id });
    });
};

// Update a BeeHiveLog by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Body to update can not be empty!",
    });
  }

  const logId = req.params.logId;

  for (let i = 0; i < req.body; i++) {
    var obj = JSON.parse(req.body)[i];
  }

  // ---------------------------------------------------------------------
  // Adding prefix to JSON-Object Keys
  var rename = function (obj, prefix) {
    if (typeof obj !== "object" || !obj) {
      return false; // check the obj argument somehow
    }

    var keys = Object.keys(obj),
      keysLen = keys.length,
      prefix = prefix || "";

    for (var i = 0; i < keysLen; i++) {
      obj[prefix + keys[i]] = obj[keys[i]];
      if (typeof obj[keys[i]] === "object") {
        rename(obj[prefix + keys[i]], prefix);
      }
      delete obj[keys[i]];
    }

    return obj;
  };

  //---------------------------------------------------------------
  console.log(logId);
  //req.body = {'date': '2019-12-07', 'meekness': '4' }
  req.body = rename(req.body, "hiveLog.$.");

  console.log(req.body);
  BeeHive.findOneAndUpdate(
    { "hiveLog.logId": logId },
    { $set: req.body },
    {
      useFindAndModify: false,
    }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update BeeHiveLog with id=${logId}. Maybe BeeHiveLog was not found!`,
        });
      } else
        res.send({ message: "BeeHiveLog was updated successfully.", data });
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
  console.log(id);
  BeeHive.findOneAndUpdate(
    { "hiveLog.logId": id },
    { $pull: { hiveLog: { logId: id } } }
  )
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