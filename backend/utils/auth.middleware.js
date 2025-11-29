import { verifyToken } from './auth.utils.js';

// Protect routes middleware
const protect = (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = verifyToken(token);

      // Add user info to request object
      req.user = decoded;
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Not authorized as admin' });
  }
};

// Vendor middleware
const vendor = (req, res, next) => {
  if (req.user && req.user.role === 'vendor') {
    next();
  } else {
    return res.status(403).json({ message: 'Not authorized as vendor' });
  }
};

// Client middleware
const client = (req, res, next) => {
  if (req.user && req.user.role === 'client') {
    next();
  } else {
    return res.status(403).json({ message: 'Not authorized as client' });
  }
};

export {
  protect,
  admin,
  vendor,
  client
};