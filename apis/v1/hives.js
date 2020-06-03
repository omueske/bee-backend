/* eslint-disable class-methods-use-this */
//import db from '../../db/db';
import { v4 as uuidv4 } from 'uuid';
import mongoose from '../../db/mongodb';

let hiveSchema = new mongoose.Schema({
  id: String,
  ownName: String,
  buildType: String,
  sections: Array,
  hiveLog: Array,
  updatedAt: { type: Date, default: Date.now }
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
    console.log(req.params)
      if (hive[0].id === req.params.id) {
        return res.status(200).send({
          success: 'true',
          message: 'BeeHive retrieved successfully',
          hive,
        });
      }
      else {
        return res.status(400).send({
          success: 'false',
          message: 'BeeHive not found'
        })
      }
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
    let filter = {}
    filter["id"] = req.params.id
    let hive = await hiveModel.findOneAndUpdate(filter, req.body, { new: true});
    return res.status(201).send({
      success: 'true',
      message: 'hive updated successfully',
      hive,
    });
  }

  async deleteHive(req, res) {
    let filter = {}
    filter["id"] = req.params.id
    let hive = await hiveModel.findOneAndRemove(filter);
    


    return res.status(200).send({
      success: 'true',
      message: 'Hive deleted successfuly',
      hive,
    });
  }
}

const hiveController = new HivesController();
export default hiveController;