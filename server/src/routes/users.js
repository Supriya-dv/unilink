import express from 'express';
import {
  getProfile,
  updateProfile,
  uploadAvatar,
  uploadCover,
  addSkill,
  removeSkill,
  getUserById,
  getAllUsers,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { uploadAvatar as uploadAvatarMw, uploadCover as uploadCoverMw } from '../middleware/upload.js';

const router = express.Router();

router.get('/me', protect, getProfile);
router.get('/all', protect, getAllUsers);
router.put('/me', protect, updateProfile);
router.post('/me/avatar', protect, uploadAvatarMw, uploadAvatar);
router.post('/me/cover', protect, uploadCoverMw, uploadCover);
router.post('/me/skills', protect, addSkill);
router.delete('/me/skills/:skill', protect, removeSkill);
router.get('/:id', protect, getUserById);

export default router;
