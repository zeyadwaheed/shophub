import AppError from '../utils/appError.js';

// Global error handling middleware
const globalErrorHandler = (err, req, res, next) => {
  console.error('GLOBAL_ERROR_HANDLER:', err);

  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';

  const response = {
    status,
    message: err.message || 'Something went wrong'
  };

  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

// 404 handler that forwards to global error handler
export const notFound = (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
};

export default globalErrorHandler;

