import jwt from 'jsonwebtoken';
import AppError from '../utils/appError.js';

// Strict authentication middleware using JWT
export const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('unauthorized user', 401));
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(new AppError('invalid token', 401));
    }

    // attach userId and role from token payload
    req.userId = decoded.userId;
    req.userRole = decoded.role || 'user';
    next();
  });
};

// Optional authentication: if no token, just continue as guest
export const authOptional = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(); // no user, but no error
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      // token was provided but invalid -> treat as error
      return next(new AppError('invalid token', 401));
    }

    req.userId = decoded.userId;
    req.userRole = decoded.role || 'user';
    next();
  });
};

// Require admin role (must run after auth middleware)
export const requireAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return next(new AppError('Forbidden. Admin access required.', 403));
  }
  next();
};

// Backwards-compatible name used in routes
export const authenticateUser = auth;

// Require an authenticated userId explicitly
export const requireAuth = (req, res, next) => {
  if (!req.userId) {
    return next(new AppError('Unauthorized. Please provide a valid token.', 401));
  }
  next();
};
