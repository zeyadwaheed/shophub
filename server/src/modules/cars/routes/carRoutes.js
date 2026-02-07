import express from 'express';
import {
  getAllCars,
  getCarByIdController,
  createCar,
  updateCarController,
  deleteCarController
} from '../controllers/carController.js';
import { requireAuth } from '../../../middleware/auth.js';

const router = express.Router();

// ✅ PUBLIC
router.get('/', getAllCars);
router.get('/:id', getCarByIdController);

// 🔐 PROTECTED
router.post('/', requireAuth, createCar);
router.put('/:id', requireAuth, updateCarController);
router.delete('/:id', requireAuth, deleteCarController);

export default router;

