const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken = (req, res, next) => {
  const jwtSecret = process.env.JWT_SECRET;
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
    });
  }

  try {
    const verified = jwt.verify(token, jwtSecret);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid token.',
    });
  }
};

module.exports = verifyToken;
