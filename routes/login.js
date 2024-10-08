const express = require('express');
const router = express.Router();
const prisma = require('../lib/client');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body; // Get email and password from client
    console.log('Login request for:', email);
    const reader = await prisma.reader.findUnique({
      where: { email: email },
      select: { id: true, password: true, email: true, isAdmin: true },
    });

    if (!reader) {
      console.log('User not found');
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcryptjs.compare(password, reader.password);
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({
        success: false,
        message: 'Incorrect password',
      });
    }

    // Create the JWT token
    const token = jwt.sign(
      { readerId: reader.id, email: reader.email, isAdmin: reader.isAdmin },
      'bomba', // Use a strong secret in production!
      { expiresIn: '1h' }
    );

    console.log('JWT created successfully');

    // Respond with the JWT token and user info
    res.json({
      success: true,
      token: token,
      userId: reader.id,
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during login',
    });
  }
});

module.exports = router;
