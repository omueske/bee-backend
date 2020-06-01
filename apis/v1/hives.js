/* eslint-disable class-methods-use-this */
//import db from '../../db/db';
import { v4 as uuidv4 } from 'uuid';
import mongoose from '../../db/mongodb';

let hiveSchema = new mongoose.Schema({
  id: String,
  ownName: String,
  buildType: String,
  sections: Array,
  hiveLog: Array
})

let hiveModel = mongoose.model('Hive', hiveSchema);

class HivesController {
  async getAllHives(req, res) {
    let query = hiveModel.find();
    query instanceof mongoose.Query;
    const hives = await query.exec();

    console.log(hives)
    return res.status(200).send({
      success: 'true',
      message: 'BeeHives retrieved successfully',
      hives
    });
  }

  async getHive(req, res) {
    let queryParam = {};
    queryParam["id"] = req.params.id
    //console.log(queryParam)
    let query = hiveModel.find(queryParam);
    query instanceof mongoose.Query;
    const hive = await query.exec();
    //console.log(hive)
    console.log(req.params)
      if (hive[0].id === req.params.id) {
        return res.status(200).send({
          success: 'true',
          message: 'BeeHive retrieved successfully',
          hive,
        });
      }
    return res.status(404).send({
      success: 'false',
      message: 'BeeHive does not exist',
    });
  }

  createHive(req, res) {
    if (!req.body.buildType) {
      return res.status(400).send({
        success: 'false',
        message: 'buildType is required',
      });
    }
    const hive = new hiveModel ({
      id: uuidv4(),
      buildType: req.body.buildType,
    });
    hive.save(function (err, hive) {
       if (err) return console.error(err);
    });
    return res.status(201).send({
      success: 'true',
      message: 'BeeHive added successfully',
      hive,
    });
  }

  async updateHive(req, res) {
    // let update = {};
    // update["id"] = req.params.id
    // let update = req.body.
    let filter = {}
    filter["id"] = req.params.id

    let hive = await hiveModel.findOneAndUpdate(filter, req.body, { new: true});
    return res.status(201).send({
      success: 'true',
      message: 'hive updated successfully',
      hive,
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