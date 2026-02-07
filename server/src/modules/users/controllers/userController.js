import jwt from 'jsonwebtoken';
import {
  registerUser,
  getUserByEmail,
  getUserById,
  getAllUsers
} from '../../../database/userConnection.js';
import { getOrdersWithProductDetails } from '../../../database/connection.js';
import errorAsync from '../../../utils/errorAsync.js';
import AppError from '../../../utils/appError.js';

// Register new user
export const signup = errorAsync(async (req, res, next) => {
  const { email, password, fullName } = req.body;

  // Basic safety check (validation middleware already runs before this)
  if (!email || !password || !fullName) {
    return next(new AppError('Please provide email, password, and fullName', 400));
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return next(new AppError('User already exists with this email', 409));
  }

  const newUser = await registerUser({ email, password, fullName });

  const token = jwt.sign(
    { userId: newUser.id, role: newUser.role || 'user' },
    process.env.SECRET_KEY,
    { expiresIn: '7d' }
  );

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      id: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
      role: newUser.role || 'user',
      token
    }
  });
});

// Login user
export const login = errorAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return next(new AppError('User not found. Please sign up first.', 404));
  }

  const isValid = await user.comparePassword(password); // encapsulate the password comparison in the user model
  if (!isValid) {
    return next(new AppError('Invalid password. Please try again.', 401));
  }
  const role = user.role || 'user';
  const token = jwt.sign(
    { userId: user._id.toString(), role },
    process.env.SECRET_KEY,
    { expiresIn: '7d' }
  );

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      id: user._id.toString(),
      email: user.email,
      fullName: user.fullName,
      role,
      token
    }
  });
});

// Get current user (works with optional auth)
export const getCurrentUser = errorAsync(async (req, res, next) => {
  // If no authenticated user, just return guest info instead of throwing
  if (!req.userId) {
    return res.status(200).json({
      success: false,
      data: null
    });
  }

  const user = await getUserById(req.userId);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// Get all users (admin only)
export const getUsers = errorAsync(async (req, res, next) => {
  const users = await getAllUsers();
  res.status(200).json({
    success: true,
    data: users
  });
});

// Get all orders (admin only) - checked-out orders with product details
export const getOrders = errorAsync(async (req, res, next) => {
  const orders = await getOrdersWithProductDetails();
  res.status(200).json({
    success: true,
    data: orders
  });
});
