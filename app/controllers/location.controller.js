const db = require("../models");
const Location = db.locations;

// Create and Save a new Location
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "name cannot be empty" });
  }

  // Create an new Location
  const location = new Location({
    name: req.body.name,
    adress: req.body.adress,
    longitude: req.body.lon,
    latitude: req.body.lat,
    hives: req.body.hives,
    comment: req.body.comment,
  });

  // Save new Location to Database
  location
    .save(location)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error Occured while creating the Location",
      });
    });
};

// Retrieve all Locations from the database.
exports.findAll = (req, res) => {
  Location.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving all Locations",
      });
    });
};

// Find a single Location with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Location.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not Location with id " + id });
      else
        res.status(200).send({
          success: "true",
          message: "Location found",
          data,
        });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Location with id=" + id });
    });
};

// Update a BeeHive by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  Location.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Location with id=${id}. Maybe Location was not found!`,
        });
      } else res.send({ message: "Location was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Location with id=" + id,
      });
    });
};

// Delete a BeeHive with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Location.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Location with id=${id}. Maybe Location was not found!`,
        });
      } else {
        res.send({
          message: "Location was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete BeeHive with id=" + id,
      });
    });
};

exports.linkBeeHive = (req, res) => {
  if (!req.params.locId) {
    res.status(400).send({ message: "locId cannot be empty" });
  }
  if (!req.params.hiveId) {
    res.status(400).send({ message: "hiveId cannot be empty" });
  }

  const linkElements = {
    href: "/api/v1/hives/" + req.params.hiveId,
    hiveId: req.params.hiveId,
  };

  console.log("HiveId: " + req.params.hiveId);
  console.log("Location: " + req.params.locId);
  console.table(linkElements);

  Location.findOneAndUpdate(
    { _id: req.params.locId },
    { $push: { hives: linkElements } },
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
          result: "Hive Linked to Location successfully",
          linkElements,
        });
      }
    }
  );
};

exports.unLinkBeeHive = (req, res) => {
  if (!req.params.hiveId) {
    res.status(400).send({ message: "hiveId cannot be empty" });
  }

  console.log("HiveId: " + req.params.hiveId);

  Location.findOneAndUpdate(
    { "hives._id": req.params.hiveId },
    { $pull: { hives: { _id: req.params.hiveId } } },
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
          result: "Hive unLinked from Location successfully",
        });
      }
    }
  );
};
