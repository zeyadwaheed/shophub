import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database/mongoConnection.js';
import productRoutes from './modules/products/routes/productRoutes.js';
import accessoryRoutes from './modules/accessories/routes/accessoryRoutes.js';
import userRoutes from './modules/users/routes/userRoutes.js';
import globalErrorHandler, { notFound } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// API routes
app.use('/api/products', productRoutes);
app.use('/api/accessories', accessoryRoutes);
app.use('/api/auth', userRoutes);

// 404 handler -> global error handler
app.use(notFound);
app.use(globalErrorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
