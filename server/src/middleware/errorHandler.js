import AppError from '../utils/appError.js';

// Global error handling middleware
const globalErrorHandler = (err, req, res, next) => {
  console.error('GLOBAL_ERROR_HANDLER:', err);

  // Joi validation error
  if (err.isJoi) {
    return res.status(400).json({
      status: 'fail',
      message: err.details[0].message
    });
  }

  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';

  res.status(statusCode).json({
    status,
    message: err.message || 'Something went wrong'
  });
};


// 404 handler that forwards to global error handler
export const notFound = (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
};

export default globalErrorHandler;

