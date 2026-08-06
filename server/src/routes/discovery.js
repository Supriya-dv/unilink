import express from 'express';
import { getCards, swipe } from '../controllers/discoveryController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/cards', protect, getCards);
router.post('/swipe', protect, swipe);

export default router;
