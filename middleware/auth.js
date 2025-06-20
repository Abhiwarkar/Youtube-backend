const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  try {
    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    console.log('Token received:', token ? 'Token exists' : 'No token');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token, authorization denied'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded:', decoded);

    // Get user from token - try multiple strategies
    let user = null;

    // Strategy 1: Direct ID lookup
    try {
      user = await User.findById(decoded.id).select('-password');
      console.log('User found by decoded.id:', user ? 'Yes' : 'No');
    } catch (e) {
      console.log('Failed to find user by decoded.id');
    }

    // Strategy 2: Try userId field
    if (!user && decoded.userId) {
      try {
        user = await User.findById(decoded.userId).select('-password');
        console.log('User found by decoded.userId:', user ? 'Yes' : 'No');
      } catch (e) {
        console.log('Failed to find user by decoded.userId');
      }
    }

    // Strategy 3: Check all users and find by any ID field
    if (!user) {
      try {
        const allUsers = await User.find({}).select('_id username email').limit(10);
        console.log('Available users in database:');
        allUsers.forEach(u => console.log(`- ${u._id} | ${u.username} | ${u.email}`));
        
        // Try to find user with matching ID
        const targetId = decoded.id || decoded.userId;
        user = allUsers.find(u => u._id.toString() === targetId);
        console.log('User found by manual search:', user ? 'Yes' : 'No');
      } catch (e) {
        console.log('Failed manual user search');
      }
    }

    if (!user) {
      console.log('❌ User not found in database');
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    console.log('✅ User authenticated:', user.username);
    req.user = user;
    next();

  } catch (error) {
    console.error('❌ Auth error:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Token is not valid'
    });
  }
};

module.exports = { protect };