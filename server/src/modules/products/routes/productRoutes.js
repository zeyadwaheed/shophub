import express from 'express';
import {
  getAllProducts,
  getProductByIdController,
  createProduct,
  updateProductController,
  deleteProductController,
  createOrderForProduct,
  getAllOrders
} from '../controllers/productController.js';
import { auth } from '../../../middleware/auth.js';

const router = express.Router();

// PUBLIC ROUTES
router.get('/', getAllProducts);
router.get('/:id', getProductByIdController);

// PROTECTED ROUTES (auth parses JWT and sets req.userId)
router.post('/', auth, createProduct);
router.put('/:id', auth, updateProductController);
router.delete('/:id', auth, deleteProductController);

// Orders (user must be logged in)
router.post('/orders', auth, createOrderForProduct);
router.get('/orders', auth, getAllOrders);

export default router;
