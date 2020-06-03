/* eslint-disable class-methods-use-this */
//import db from '../../db/db';
import { v4 as uuidv4 } from 'uuid';
import mongoose from '../../db/mongodb';

let hiveLogSchema = new mongoose.Schema({
  id: String,
  date: Date,
  findings: Array,
  frames: Array,
  food: Array,
  meekness: Number,
  comment: String,
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

let hiveLogModel = mongoose.model('HiveLog', hiveLogSchema);

class HiveLogController {
    async getAllHiveLogs(req, res) {
      let query = hiveLogModel.find();
      query instanceof mongoose.Query;
      const hiveLogs = await query.exec();
  
      console.log(hiveLogs)
      return res.status(200).send({
        success: 'true',
        message: 'HiveLogs retrieved successfully',
        hiveLogs
      });
    }

    async getHiveLog(req, res) {
        let queryParam = {};
        queryParam["id"] = req.params.id
        //console.log(queryParam)
        let query = hiveLogModel.find(queryParam);
        query instanceof mongoose.Query;
        const hiveLog = await query.exec();
        console.log(req.params)
          if (hiveLog[0].id === req.params.id) {
            return res.status(200).send({
              success: 'true',
              message: 'BeeHiveLog retrieved successfully',
              hiveLog,
            });
          }
          else {
            return res.status(400).send({
              success: 'false',
              message: 'BeeHiveLog not found'
            })
          }
      }

      createHiveLog(req, res) {
        if (!req.body.date) {
          return res.status(400).send({
            success: 'false',
            message: 'Date is required',
          });
        }
        const hiveLog = new hiveLogModel ({
          id: uuidv4(),
          date: req.body.date,
          findings: req.body.findings,
          frames: req.body.frame,
          food: req.body.food,
          meekness: req.body.meekness,
          comment: req.body.comment
        });
        hiveLog.save(function (err, hive) {
           if (err) return console.error(err);
        });
        return res.status(201).send({
          success: 'true',
          message: 'BeeHiveLog added successfully',
          hiveLog,
        });
    }
      
    async updateHiveLog(req, res) {
        let filter = {}
        filter["id"] = req.params.id
        let hiveLog = await hiveLogModel.findOneAndUpdate(filter, req.body, { new: true});
        return res.status(201).send({
            success: 'true',
            message: 'hiveLog updated successfully',
            hiveLog,
        });
        }
    
        async deleteHiveLog(req, res) {
        let filter = {}
        filter["id"] = req.params.id
        let hiveLog = await hiveLogModel.findOneAndRemove(filter);
        
        return res.status(200).send({
            success: 'true',
            message: 'HiveLog deleted successfuly',
            hiveLog,
        });
        }
}

const hiveLogController = new HiveLogController();
export default hiveLogController;
//     hiveLog: [{
//     "date": "9452952532",
//     "finding": [{
//         "eggs": true,
//         "larves": true,
//         "capped": true
//     }],
//     "frame": [{
//         "brood": 0,
//         "food": 0,
//         "comb": -1,
//         "empty": 0,
//         "foundation": 1
//     }],
//     "food": [{
//         "sirup": 20,
//         "pastry": 14
//     }],
//     meekness: 2,
//     comment: "Mouse at the Hive again"
//     }]
// })
