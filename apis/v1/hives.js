/* eslint-disable class-methods-use-this */
import db from '../../db/db';

class HivesController {
  getAllHives(req, res) {
    return res.status(200).send({
      success: 'true',
      message: 'BeeHives retrieved successfully',
      hive: db,
    });
  }

  getHive(req, res) {
    const id = parseInt(req.params.id, 10);
    db.map((hive) => {
      if (hive.id === id) {
        return res.status(200).send({
          success: 'true',
          message: 'BeeHive retrieved successfully',
          hive,
        });
      }
    });
    return res.status(404).send({
      success: 'false',
      message: 'BeeHive does not exist',
    });
  }

  createHive(req, res) {
    if (!req.body.title) {
      return res.status(400).send({
        success: 'false',
        message: 'title is required',
      });
    } else if (!req.body.description) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required',
      });
    }
    const hive = {
      id: db.length + 1,
      title: req.body.title,
      description: req.body.description,
    };
    db.push(hive);
    return res.status(201).send({
      success: 'true',
      message: 'BeeHive added successfully',
      hive,
    });
  }

  updateHive(req, res) {
    const id = parseInt(req.params.id, 10);
    let hiveFound;
    let itemIndex;
    db.map((hive, index) => {
      if (hive.id === id) {
        hiveFound = hive;
        itemIndex = index;
      }
    });

    if (!hiveFound) {
      return res.status(404).send({
        success: 'false',
        message: 'BeeHive not found',
      });
    }

    if (!req.body.title) {
      return res.status(400).send({
        success: 'false',
        message: 'title is required',
      });
    } else if (!req.body.description) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required',
      });
    }

    const newHive = {
      id: hiveFound.id,
      title: req.body.title || hiveFound.title,
      description: req.body.description || hiveFound.description,
    };

    db.splice(itemIndex, 1, newHive);

    return res.status(201).send({
      success: 'true',
      message: 'hive added successfully',
      newHive,
    });
  }

  deleteHive(req, res) {
    const id = parseInt(req.params.id, 10);
    let hiveFound;
    let itemIndex;
    db.map((hive, index) => {
      if (hive.id === id) {
        hiveFound = hive;
        itemIndex = index;
      }
    });

    if (!hiveFound) {
      return res.status(404).send({
        success: 'false',
        message: 'hive not found',
      });
    }
    db.splice(itemIndex, 1);

    return res.status(200).send({
      success: 'true',
      message: 'Hive deleted successfuly',
    });
  }
}

const hiveController = new HivesController();
export default hiveController;