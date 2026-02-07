import AppError from './appError.js';

// Global error handling middleware (to be used at the end of the middleware stack)
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

// 404 creator, if you want to use it from here instead of middleware file
export const notFound = (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
};

export default globalErrorHandler;

