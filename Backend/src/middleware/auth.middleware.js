const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Updated import path

/**
 * Protect routes - Authentication middleware
 */
const protect = async (req, res, next) => {
  let token;
  
  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from the token (exclude password)
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }
      
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

/**
 * Admin middleware
 */
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, admin };