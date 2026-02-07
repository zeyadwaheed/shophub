import {
  getAccessories,
  getAccessoryById,
  addAccessory,
  updateAccessory,
  deleteAccessory
} from '../../../database/connection.js';
import errorAsync from '../../../utils/errorAsync.js';
import AppError from '../../../utils/appError.js';

// Get all accessories
export const getAllAccessories = errorAsync(async (req, res) => {
  const accessories = await getAccessories();
  res.status(200).json({
    success: true,
    count: accessories.length,
    data: accessories
  });
});

// Get single accessory by ID
export const getAccessoryByIdController = errorAsync(async (req, res, next) => {
  const { id } = req.params;
  const accessory = await getAccessoryById(id);

  if (!accessory) {
    return next(new AppError('Accessory not found', 404));
  }

  res.status(200).json({
    success: true,
    data: accessory
  });
});

// Create new accessory
export const createAccessory = errorAsync(async (req, res, next) => {
  const { name, brand, price, type, color, description, image } = req.body;

  if (!name || !brand || !price) {
    return next(new AppError('Please provide name, brand, and price', 400));
  }

  const newAccessory = await addAccessory({
    name,
    brand,
    price,
    type: type || 'accessory',
    color: color || 'Unknown',
    description: description || '',
    image: image || 'https://via.placeholder.com/400',
    category: 'accessory'
  });

  res.status(201).json({
    success: true,
    message: 'Accessory added successfully',
    data: newAccessory
  });
});

// Update accessory
export const updateAccessoryController = errorAsync(async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  const updatedAccessory = await updateAccessory(id, updates);

  if (!updatedAccessory) {
    return next(new AppError('Accessory not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Accessory updated successfully',
    data: updatedAccessory
  });
});

// Delete accessory
export const deleteAccessoryController = errorAsync(async (req, res, next) => {
  const { id } = req.params;

  const deletedAccessory = await deleteAccessory(id);

  if (!deletedAccessory) {
    return next(new AppError('Accessory not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Accessory deleted successfully',
    data: deletedAccessory
  });
});

