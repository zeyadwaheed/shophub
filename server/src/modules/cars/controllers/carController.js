import {
  getCars,
  getCarById,
  addCar,
  updateCar,
  deleteCar
} from '../../../database/connection.js';
import errorAsync from '../../../utils/errorAsync.js';
import AppError from '../../../utils/appError.js';

// Get all cars
export const getAllCars = errorAsync(async (req, res) => {
  const cars = await getCars();
  res.status(200).json({
    success: true,
    count: cars.length,
    data: cars
  });
});

// Get single car by ID
export const getCarByIdController = errorAsync(async (req, res, next) => {
  const { id } = req.params;
  const car = await getCarById(id);

  if (!car) {
    return next(new AppError('Car not found', 404));
  }

  res.status(200).json({
    success: true,
    data: car
  });
});

// Create new car
export const createCar = errorAsync(async (req, res, next) => {
  const { name, brand, price, year, mileage, color, description, image } = req.body;

  if (!name || !brand || !price) {
    return next(new AppError('Please provide name, brand, and price', 400));
  }

  const newCar = await addCar({
    name,
    brand,
    price,
    year: year || new Date().getFullYear(),
    mileage: mileage ?? 0,
    color: color || 'Unknown',
    description: description || '',
    image: image || 'https://via.placeholder.com/400',
    category: 'car'
  });

  res.status(201).json({
    success: true,
    message: 'Car added successfully',
    data: newCar
  });
});

// Update car
export const updateCarController = errorAsync(async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  const updatedCar = await updateCar(id, updates);

  if (!updatedCar) {
    return next(new AppError('Car not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Car updated successfully',
    data: updatedCar
  });
});

// Delete car
export const deleteCarController = errorAsync(async (req, res, next) => {
  const { id } = req.params;

  const deletedCar = await deleteCar(id);

  if (!deletedCar) {
    return next(new AppError('Car not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Car deleted successfully',
    data: deletedCar
  });
});

