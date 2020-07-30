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
      queen: req.body.queen,
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
  console.table(req.body);
  if (!req.body) {
    logger.error("HTTP-400 |Data to update can not be empty!");
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  if (!req.params.id) {
    logger.error("HTTP-400 |hiveId can not be empty!");
    return res.status(400).send({
      message: "hiveId can not be empty!",
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
        console.table(data);
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

exports.createQueen = (req, res) => {
  logger.info("BeeHive | linkQueenBeeHive");
  logger.debug(req.params);
  if (!req.params.hiveId) {
    res
      .status(400)
      .send(
        { message: "hiveId cannot be empty" },
        logger.error("HTTP-400: hiveId cannot be empty")
      );
  }
  if (!req.body.queen) {
    res
      .status(400)
      .send(
        { message: "queen cannot be empty" },
        logger.error("HTTP-400: queenId cannot be empty")
      );
  }

  logger.debug("findOneAndUpdate");
  BeeHive.findOneAndUpdate(
    { _id: req.params.hiveId },
    { $push: { queen: req.body.queen } },
    { new: true, useFindAndModify: false },
    function (err, update) {
      if (err) {
        logger.error("HTTP-500: Server error while Linking");
        return res.status(500).json({
          status: "error",
          result: "server error",
        });
      } else {
        console.log(update);
        const queen = update.queen[update.queen.length - 1];
        queen.hive = {};
        queen.hive._id = update._id;
        queen.name = update.name;

        logger.info("HTTP-200: Queen added to BeeHive successfully");
        return res.status(200).json({
          status: "ok",
          result: "Queen added to BeeHive successfully",
          hive: req.params.hiveId,
          //queen: req.body.queen,
          queen: queen,
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

  const id = req.params.queenId;
  BeeHive.findOneAndUpdate(
    { "queen._id": req.params.queenId },
    { $pull: { queen: { _id: req.params.queenId } } },
    { new: true },
    function (err, update) {
      if (err) {
        return res.status(500).json(
          {
            status: "error",
            result: "server error",
          },
          logger.error(
            "HTTP-500: Server error while deleting Queen from BeeHive"
          )
        );
      } else {
        logger.info("HTTP-200: Queen deleted from Hive successfully\n");
        return res.status(200).json({
          status: "ok",
          result: "Queen deleted from Hive successfully: " + res,
        });
      }
    }
  );
};
// move Queen to Beehive
exports.moveQueen = async (req, res) => {
  logger.info("BeeHive | Move Queen called");

  if (!req.params.queenId) {
    logger.error("HTTP-400: queenId cannot be empty");
    res.status(400).send({ message: "queenId cannot be empty" });
  }
  if (!req.params.hiveId) {
    logger.error("HTTP-400: hiveId cannot be empty");
    res.status(400).send({ message: "hiveId cannot be empty" });
  }
  if (!req.body) {
    logger.error("HTTP-400: queen cannot be empty");
    res.status(400).send({ message: "queen cannot be empty" });
  }
  logger.debug("QueenId: " + req.params.queenId);
  logger.debug("HiveId: " + req.params.hiveId);
  logger.debug("findOneAndUpdate");

  // Find Queen and save it
  // const findQueen = async function (params) {
  //   try {
  //     return await BeeHive.findOne(params);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const blubb = findQueen({ _id: req.params.queenId });
  // console.table(blubb);
  async function getQueen(qId) {
    console.log(qId);
    await BeeHive.findOne({ "queen._id": qId })
      .then(function (queen) {
        // console.table(queen);
        return queen[0];
      })
      .catch((err) => {
        logger.error(
          "HTTP-500: Some error Occured while finding the Queen \n" + err
        );
        res.status(500).send({
          message:
            err.message || "Some error Occured while finding the BeeHive",
        });
      });
  }

  let queen = getQueen(req.params.queenId);
  console.table(queen);
  // Unlink Queen from old Hive
  // console.table(req.params);
  // console.table(req.body);
  BeeHive.findOneAndUpdate(
    { "queen._id": req.params.queenId },
    { $pull: { queen: { _id: req.params.queenId } } },
    { new: true },

    function (err, update) {
      if (err) {
        return res.status(500).json(
          {
            status: "error",
            result: "server error",
          },
          logger.error(
            "HTTP-500: [moveQueen] Server error while unLinking Queen " +
              req.params.queenId +
              "from old BeeHive"
          )
        );
      }
    }
  );
  BeeHive.updateOne(
    { _id: req.params.hiveId },
    { $push: { queen: req.body } },
    { new: true },

    function (err, update) {
      if (err) {
        return res.status(500).json(
          {
            status: "error",
            result: "server error",
          },
          logger.error(
            "HTTP-500: [moveQueen] Server error while linking Queen to new BeeHive"
          )
        );
      } else {
        logger.info("HTTP-200: Queen moved to Hive successfully\n");
        console.log(update);
        return res.status(200).json({
          status: "ok",
          result:
            "Queen " +
            req.params.queenId +
            "moved to Hive successfully: " +
            res,
        });
      }
    }
  );
};

// // Retrieve all BeeHives from the database.
// exports.findAllQueens = (req, res) => {
//   logger.info("BeeHive | findAllQueens called");
//   BeeHive.find()
//     .then((data) => {
//       logger.info("HTTP-200 | All Queens found");
//       res.send({ hiveId: data._id, data.queen });
//     })
//     .catch((err) => {
//       logger.error("HTTP-500: Some error Occured while retrieving all Queens ");
//       res.status(500).send({
//         message:
//           err.message || "Some error occured while retrieving all Queens",
//       });
//     });
// };
