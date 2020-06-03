import express from 'express';
import QueensController from '../apis/v1/queens';

const router = express.Router();

router.get('/api/v1/queens', QueensController.getAllQueens);
router.get('/api/v1/queens/:id', QueensController.getQueen);
router.post('/api/v1/queens', QueensController.createQueen);
router.put('/api/v1/queens/:id', QueensController.updateQueen);
router.delete('/api/v1/queens/:id', QueensController.deleteQueen);

export default router;