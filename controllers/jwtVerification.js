const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get the token from the request header
  console.log(req.headers);
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
    });
  }

  try {
    const verified = jwt.verify(token, 'bomba'); // Verify the token with the same secret
    req.user = verified; // Attach the decoded token (user info) to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid token.',
    });
  }
};

module.exports = verifyToken;
