import express from 'express';
import {
  getAllAccessories,
  getAccessoryByIdController,
  createAccessory,
  updateAccessoryController,
  deleteAccessoryController
} from '../controllers/accessoryController.js';
import { requireAuth } from '../../../middleware/auth.js';

const router = express.Router();

// PUBLIC
router.get('/', getAllAccessories);
router.get('/:id', getAccessoryByIdController);

// PROTECTED
router.post('/', requireAuth, createAccessory);
router.put('/:id', requireAuth, updateAccessoryController);
router.delete('/:id', requireAuth, deleteAccessoryController);

export default router;

