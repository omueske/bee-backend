const db = require("../models");
const Location = db.locations;
const logger = require("../config/log4js");

// Create and Save a new Location
exports.create = (req, res) => {
  logger.info("Location | Create called");
  if (!req.body.name) {
    logger.error("HTTP-400: 'name' cannot be empty");
    res.status(400).send({ message: "name cannot be empty" });
  } else {
    // Create an new Location
    const location = new Location({
      name: req.body.name,
      adress: req.body.adress,
      longitude: req.body.lon,
      latitude: req.body.lat,
      hives: req.body.hives,
      comment: req.body.comment,
    });
    logger.debug("New Location - " + location);

    // Save new Location to Database
    location
      .save(location)
      .then((data) => {
        logger.info("Location saved to Database");
        logger.debug(data);
        res.send(data);
      })
      .catch((err) => {
        logger.error("Error while saving Location to Database");
        res.status(500).send({
          message:
            err.message || "Some error Occured while creating the Location",
        });
      });
  }
};

// Retrieve all Locations from the database.
exports.findAll = (req, res) => {
  logger.info("Location | findAll called");
  Location.find()
    .then((data) => {
      logger.info("Searching Location");
      logger.debug(data);
      res.send(data);
    })
    .catch((err) => {
      logger.error("HTTP-500: Error searching all Locations");
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving all Locations",
      });
    });
};

// Find a single Location with an id
exports.findOne = (req, res) => {
  logger.info("Location | findOne called");
  const id = req.params.id;

  logger.info("LocationID " + id);
  Location.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No Location with id " + id });
        logger.error("HTTP-404: LocationID " + id + " not found");
      } else {
        logger.info("HTTP-200: Found LocationID " + id);
        res.status(200).send({
          success: "true",
          message: "Location found",
          data,
        });
      }
    })
    .catch((err) => {
      logger.info("HTTP-500: Error retrieving Location with id=" + id);
      res
        .status(500)
        .send({ message: "Error retrieving Location with id=" + id });
    });
};

// Update a BeeHive by the id in the request
exports.update = (req, res) => {
  logger.info("Location | update called");
  if (!req.body) {
    logger.error("HTTP-400: 'data' cannot be empty");
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  } else {
    const id = req.params.id;
    logger.info("Updating id=" + id);
    Location.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          logger.error(
            `HTTP-404: Cannot update Location with id=${id}. Maybe Location was not found`
          );
          res.status(404).send({
            message: `Cannot update Location with id=${id}. Maybe Location was not found!`,
          });
        } else logger.info("HTTP-200: Location was updated successfully");
        res.send({ message: "Location was updated successfully." });
      })
      .catch((err) => {
        logger.error(`HTTP-500: Error updating Location with id=${id}.`);
        res.status(500).send({
          message: "Error updating Location with id=" + id,
        });
      });
  }
};

// Delete a BeeHive with the specified id in the request
exports.delete = (req, res) => {
  logger.info("Location | delete called");
  const id = req.params.id;

  Location.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        logger.error("HTTP-404: LocationID " + id + " not found");
        res.status(404).send({
          message: `Cannot delete Location with id=${id}. Maybe Location was not found!`,
        });
      } else {
        logger.info("HTTP-200: LocationID " + id + " deleted successfully");
        res.send({
          message: "Location was deleted successfully!",
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

exports.linkBeeHive = (req, res) => {
  logger.info("Location | linkBeeHive");
  if (!req.params.locId) {
    res
      .status(400)
      .send(
        { message: "locId cannot be empty" },
        logger.error("HTTP-400: locId cannot be empty")
      );
  }
  if (!req.params.hiveId) {
    res
      .status(400)
      .send(
        { message: "hiveId cannot be empty" },
        logger.error("HTTP-400: hiveId cannot be empty")
      );
  }

  const linkElements = {
    href: "/api/v1/hives/" + req.params.hiveId,
    hiveId: req.params.hiveId,
  };
  logger.debug("Linking " + linkElements);

  // console.log("HiveId: " + req.params.hiveId);
  // console.log("Location: " + req.params.locId);
  // console.table(linkElements);
  logger.debug("findOneAndUpdate");
  Location.findOneAndUpdate(
    { _id: req.params.locId },
    { $push: { hives: linkElements } },
    { new: true },
    function (err, update) {
      if (err) {
        logger.error("HTTP-500: Server error while Linking");
        return res.status(500).json({
          status: "error",
          result: "server error",
        });
      } else {
        logger.info("HTTP-200: Hive Linked to Location successfully");
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
  logger.info("Location | unLinkBeeHive");
  if (!req.params.hiveId) {
    logger.error("HTTP-400: HiveID cannot be empty");
    res.status(400).send({ message: "hiveId cannot be empty" });
  }

  logger.debug("HiveId: " + req.params.hiveId);
  logger.debug("findOneAndUpdate");
  Location.findOneAndUpdate(
    { "hives._id": req.params.hiveId },
    { $pull: { hives: { _id: req.params.hiveId } } },
    { new: true },
    function (err, update) {
      if (err) {
        return res.status(500).json(
          {
            status: "error",
            result: "server error",
          },
          logger.error("HTTP-500: Server error while unLinking")
        );
      } else {
        logger.info("HTTP-200: Hive Linked to Location successfully");
        return res.status(200).json({
          status: "ok",
          result: "Hive unLinked from Location successfully",
        });
      }
    }
  );
};
