const express = require('express');
const router = express.Router();
const prisma = require('../lib/client');
const bcryptjs = require('bcryptjs');

router.post('/', async (req, res, next) => {
  try {
    // Hash the password using bcryptjs
    const hashedPassword = await bcryptjs.hash(req.body.password, 10);

    // Check if the email already exists
    const existingReader = await prisma.reader.findUnique({
      where: { email: req.body.email },
    });

    if (existingReader) {
      // Email already registered
      console.error('Email or Username already registered');
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
    }

    // If the email is not registered, create a new reader
    await prisma.reader.create({
      data: {
        password: hashedPassword,
        email: req.body.email,
        username: req.body.username,
        isAdmin: false,
      },
    });

    // Send a success response
    res.status(201).json({
      success: true,
      message: 'User created successfully',
    });
  } catch (err) {
    // Handle any unexpected errors
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'An error occurred during signup',
    });
    return next(err); // Pass the error to the next middleware
  }
});

module.exports = router;
