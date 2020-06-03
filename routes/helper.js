import express from 'express';
import HelperController from '../apis/v1/helper';

const router = express.Router();

router.get('/api/v1/yearColor/:year', HelperController.getYearColor);

export default router;