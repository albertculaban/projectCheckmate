// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Adjust according to your User model location

// Protect route middleware to verify JWT
const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  token = token.split(' ')[1]; // Remove "Bearer " prefix from token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password'); // Attach user data to the request
    next(); // Pass to the next middleware
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = { protect };
