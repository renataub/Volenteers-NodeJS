import express from 'express';
import volenteerController from '../controllers/VolenteerController.js';

const router = express.Router();

router.get('/', volenteerController.getAll);

router.get('/:id', volenteerController.getById);

// router.post('/', volenteerController.insert);

export default router;
