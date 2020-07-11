const db = require("../models");
const BeeHive = db.beehives;
const logger = require("../config/log4js");

// Create and Save a new BeeHive
exports.create = (req, res) => {
  logger.info("BeeHive | Create called");
  logger.debug(req.body);
  if (!req.body.buildType) {
    res.status(400).send({ message: "buildType cannot be empty" });
    logger.error("HTTP-400 | HIVE POST /");
  } else {
    // Create an new BeeHive
    const beeHive = new BeeHive({
      number: req.body.number,
      name: req.body.name,
      buildType: req.body.buildType,
      sections: req.body.sections,
      hiveLog: req.body.hivelog,
      todos: req.body.todos,
      status: req.body.status,
      comment: req.body.comment,
    });

    logger.debug(beeHive);

    // Save new BeeHive to Database
    beeHive
      .save(beeHive)
      .then((data) => {
        res.send(data);
        logger.info("HTTP-200 | HIVE POST /");
      })
      .catch((err) => {
        logger.error(
          "HTTP-500: Some error Occured while creating the BeeHive \n" + err
        );
        res.status(500).send({
          message:
            err.message || "Some error Occured while creating the BeeHive",
        });
      });
  }
};

// Retrieve all BeeHives from the database.
exports.findAll = (req, res) => {
  logger.info("BeeHive | findAll called");
  BeeHive.find()
    .then((data) => {
      logger.info("HTTP-200 | All Hives found");
      res.send(data);
    })
    .catch((err) => {
      logger.error(
        "HTTP-500: Some error Occured while retrieving all BeeHives "
      );
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving all BeeHivess",
      });
    });
};

// Find a single BeeHive with an id
exports.findOne = (req, res) => {
  logger.info("BeeHive | findOne called");
  const id = req.params.id;

  BeeHive.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found BeeHive with id " + id });
        logger.error("HTTP-404 |  BeeHive not found " + id);
      } else {
        res.send(data);
        logger.info("HTTP-200 | Found BeeHive " + id);
      }
    })
    .catch((err) => {
      logger.error("HTTP-500: Error retrieving BeeHive with id=" + id);
      res
        .status(500)
        .send({ message: "Error retrieving BeeHive with id=" + id });
    });
};

// Update a BeeHive by the id in the request
exports.update = (req, res) => {
  logger.info("BeeHive | Update called");
  if (!req.body) {
    logger.error("HTTP-400 |Data to update can not be empty!");
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  BeeHive.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        logger.error(
          `HTTP-404 |Cannot update BeeHive with id=${id}. Maybe BeeHive was not found!`
        );
        res.status(404).send({
          message: `Cannot update BeeHive with id=${id}. Maybe BeeHive was not found!`,
        });
      } else {
        res.send({ message: "BeeHive was updated successfully.", data });
        logger.info("HTTP-200 | BeeHive was updated successfully. " + id);
      }
    })
    .catch((err) => {
      logger.error("HTTP-500: Error updating BeeHive with id=" + id);
      res.status(500).send({
        message: "Error updating BeeHive with id=" + id,
      });
    });
};

exports.linkQueen = (req, res) => {
  logger.info("BeeHive | linkQueenBeeHive");
  if (!req.params.hiveId) {
    res
      .status(400)
      .send(
        { message: "hiveId cannot be empty" },
        logger.error("HTTP-400: hiveId cannot be empty")
      );
  }
  if (!req.params.queenId) {
    res
      .status(400)
      .send(
        { message: "queenId cannot be empty" },
        logger.error("HTTP-400: queenId cannot be empty")
      );
  }

  const linkElements = {
    href: "/api/v1/queens/" + req.params.queenId,
    queenId: req.params.queenId,
  };
  logger.debug("Linking " + linkElements);

  logger.debug("findOneAndUpdate");
  BeeHive.findOneAndUpdate(
    { _id: req.params.hiveId },
    { $push: { queen: linkElements } },
    { new: true, useFindAndModify: false },
    function (err, update) {
      if (err) {
        logger.error("HTTP-500: Server error while Linking");
        return res.status(500).json({
          status: "error",
          result: "server error",
        });
      } else {
        logger.info("HTTP-200: Queen Linked to BeeHive successfully");
        return res.status(200).json({
          status: "ok",
          result: "Queen Linked to BeeHive successfully",
          linkElements,
        });
      }
    }
  );
};

// Delete a BeeHive with the specified id in the request
exports.delete = (req, res) => {
  logger.info("BeeHive | Delete called");
  const id = req.params.id;

  BeeHive.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        logger.error(
          `HTTP-404: Cannot delete BeeHive with id=${id}. Maybe BeeHive was not found!`
        );
        res.status(404).send({
          message: `Cannot delete BeeHive with id=${id}. Maybe BeeHive was not found!`,
        });
      } else {
        logger.error("HTTP-200: BeeHive was deleted successfully!");
        res.send({
          message: "BeeHive was deleted successfully!",
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

// Delete all BeeHives from the database.
exports.deleteAll = (req, res) => {
  logger.info("BeeHive | DeleteAll called");
  BeeHive.deleteMany({})
    .then((data) => {
      logger.info(
        `HTTP-200: ${data.deletedCount} BeeHives were deleted successfully!`
      );
      res.send({
        message: `${data.deletedCount} BeeHives were deleted successfully!`,
      });
    })
    .catch((err) => {
      logger.error(
        "HTTP-500: Some error occurred while removing all BeeHives."
      );
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all BeeHives.",
      });
    });
};

// unLink Queen to Beehives
exports.unLinkQueen = (req, res) => {
  logger.info("BeeHive | Unlink Queen called");

  if (!req.params.queenId) {
    logger.error("HTTP-400: queenId cannot be empty");
    res.status(400).send({ message: "queenId cannot be empty" });
  }
  logger.debug("QueenId: " + req.params.queenId);
  logger.debug("findOneAndUpdate");
  BeeHive.findOneAndUpdate(
    { "queen.queenId": req.params.queenId },
    { $pull: { queen: { queenId: req.params.queenId } } },
    { new: true },
    function (err, update) {
      if (err) {
        return res.status(500).json(
          {
            status: "error",
            result: "server error",
          },
          logger.error(
            "HTTP-500: Server error while unLinking Queen from BeeHive"
          )
        );
      } else {
        logger.info("HTTP-200: Queen unLinked from Hive successfully\n");
        return res.status(200).json({
          status: "ok",
          result: "Queen unLinked from Hive successfully: " + res,
        });
      }
    }
  );
};
