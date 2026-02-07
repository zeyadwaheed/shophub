import express from 'express';
import {
  signup,
  login,
  getCurrentUser,
  getUsers,
  getOrders
} from '../controllers/userController.js';
import { auth, authOptional, requireAdmin } from '../../../middleware/auth.js';
import validation from '../../../middleware/validation.js';
import { signUpSchema, signInSchema } from '../validation/user.validation.js';

const router = express.Router();

// Auth routes with validation middleware
router.post('/signup', validation(signUpSchema), signup);
router.post('/login', validation(signInSchema), login);

// Current user (requires auth)
router.get('/me', auth, getCurrentUser);

// Admin only: list all users
router.get('/users', auth, requireAdmin, getUsers);

// Admin only: list all checked-out orders
router.get('/orders', auth, requireAdmin, getOrders);

export default router;
