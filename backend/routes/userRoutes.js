import express from 'express';
import { getUsers, updateUserStatus, deleteUser } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';
import admin from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', protect, admin, getUsers);
router.put('/:id/status', protect, admin, updateUserStatus);
router.delete('/:id', protect, admin, deleteUser);

export default router;
