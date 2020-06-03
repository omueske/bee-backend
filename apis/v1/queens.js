/* eslint-disable class-methods-use-this */
//import db from '../../db/db';
import { v4 as uuidv4 } from 'uuid';
import mongoose from '../../db/mongodb';

let queenSchema = new mongoose.Schema({
  id: String,
  number: Number,
  hatchYear: Number,
  pedigree: String,
  comment: String,
  updatedAt: { type: Date, default: Date.now }
})

let queenModel = mongoose.model('Queen', queenSchema);

class QueensController {
  async getAllQueens(req, res) {
    let query = queenModel.find();
    query instanceof mongoose.Query;
    const queens = await query.exec();

    return res.status(200).send({
      success: 'true',
      message: 'Queens retrieved successfully',
      queens
    });
  }

  async getQueen(req, res) {
    let queryParam = {};
    queryParam["id"] = req.params.id
    //console.log(queryParam)
    let query = queenModel.find(queryParam);
    query instanceof mongoose.Query;
    const queen = await query.exec();
      if (queen[0].id === req.params.id) {
        return res.status(200).send({
          success: 'true',
          message: 'Queen retrieved successfully',
          queen,
        });
      }
      else {
        return res.status(400).send({
          success: 'false',
          message: 'Queen not found'
        })
      }
  }

  createQueen(req, res) {
    if (!req.body.hatchYear) {
      return res.status(400).send({
        success: 'false',
        message: 'hatchYear is required',
      });
    }
    const queen = new queenModel ({
      id: uuidv4(),
      hatchYear: req.body.hatchYear,
      pedigree: req.body.pedigree,
      number: req.body.number,
      comment: req.body.comment
    });
    queen.save(function (err, queen) {
       if (err) return console.error(err);
    });
    return res.status(201).send({
      success: 'true',
      message: 'Queen added successfully',
      queen,
    });
  }

  async updateQueen(req, res) {
    let filter = {}
    filter["id"] = req.params.id
    let queen = await queenModel.findOneAndUpdate(filter, req.body, { new: true});
    return res.status(201).send({
      success: 'true',
      message: 'Queen updated successfully',
      queen,
    });
  }

  async deleteQueen(req, res) {
    let filter = {}
    filter["id"] = req.params.id
    let queen = await QueenModel.findOneAndRemove(filter);

    return res.status(200).send({
      success: 'true',
      message: 'Queen deleted successfuly',
      queen,
    });
  }
}

const queenController = new QueensController();
export default queenController;