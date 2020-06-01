import express from 'express';
import HivesController from '../apis/v1/hives';

const router = express.Router();

router.get('/api/v1/hives', HivesController.getAllHives);
router.get('/api/v1/hives/:id', HivesController.getHive);
router.post('/api/v1/hives', HivesController.createHive);
router.put('/api/v1/hives/:id', HivesController.updateHive);
router.delete('/api/v1/hives/:id', HivesController.deleteHive);

export default router;