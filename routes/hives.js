import express from 'express';
import HivesController from '../apis/v1/hives';
import HiveLogController from '../apis/v1/hivelog';

const router = express.Router();

router.get('/api/v1/hives', HivesController.getAllHives);
router.get('/api/v1/hives/:id', HivesController.getHive);
router.post('/api/v1/hives', HivesController.createHive);
router.put('/api/v1/hives/:id', HivesController.updateHive);
router.delete('/api/v1/hives/:id', HivesController.deleteHive);

router.get('/api/v1/hivelog', HiveLogController.getAllHiveLogs);
router.get('/api/v1/hivelog/:id', HiveLogController.getHiveLog);
router.post('/api/v1/hivelog', HiveLogController.createHiveLog);
router.put('/api/v1/hivelog/:id', HiveLogController.updateHiveLog);
router.delete('/api/v1/hivelog/:id', HiveLogController.deleteHiveLog);
export default router;