import express from 'express';
import { getConnections, acceptRequest, declineRequest } from '../controllers/connectionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getConnections);
router.post('/accept/:id', protect, acceptRequest);
router.post('/decline/:id', protect, declineRequest);

export default router;
