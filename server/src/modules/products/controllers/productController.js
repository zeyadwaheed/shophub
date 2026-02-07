import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  addOrder,
  getOrders
} from '../../../database/connection.js';
import errorAsync from '../../../utils/errorAsync.js';
import AppError from '../../../utils/appError.js';

// Get all products
export const getAllProducts = errorAsync(async (req, res) => {
  const products = await getProducts();
  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

// Get single product by ID
export const getProductByIdController = errorAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await getProductById(id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

// Create new product
export const createProduct = errorAsync(async (req, res, next) => {
  const { name, brand, price, year, mileage, color, description, image, category } = req.body;

  if (!name || !brand || !price) {
    return next(new AppError('Please provide name, brand, and price', 400));
  }

  const newProduct = await addProduct({
    name,
    brand,
    price,
    year: year || new Date().getFullYear(),
    mileage: mileage ?? 0,
    color: color || 'Unknown',
    description: description || '',
    image: image || 'https://via.placeholder.com/400',
    category: category || 'other'
  });

  res.status(201).json({
    success: true,
    message: 'Product added successfully',
    data: newProduct
  });
});

// Update product
export const updateProductController = errorAsync(async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  const updatedProduct = await updateProduct(id, updates);

  if (!updatedProduct) {
    return next(new AppError('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    data: updatedProduct
  });
});

// Delete product
export const deleteProductController = errorAsync(async (req, res, next) => {
  const { id } = req.params;

  const deletedProduct = await deleteProduct(id);

  if (!deletedProduct) {
    return next(new AppError('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
    data: deletedProduct
  });
});

// Create order (product)
export const createOrderForProduct = errorAsync(async (req, res, next) => {
  const { productId, carId, quantity } = req.body;
  const idToUse = productId || carId;
  const userId = req.userId || 'user-' + Math.random().toString(36).substr(2, 9);

  if (!idToUse || !quantity) {
    return next(new AppError('Please provide productId (or carId) and quantity', 400));
  }

  const product = await getProductById(idToUse);
  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  const totalPrice = product.price * quantity;
  const newOrder = await addOrder({
    userId,
    productId: idToUse,
    quantity,
    totalPrice
  });

  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    data: newOrder
  });
});

// Get all orders
export const getAllOrders = errorAsync(async (req, res) => {
  const orders = await getOrders();
  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders
  });
});

