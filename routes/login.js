const express = require('express');
const router = express.Router();
const prisma = require('../lib/client');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

router.post('/', async (req, res) => {
  try {
    const reader = await prisma.reader.findUnique({
      where: { email: req.body.email },
      select: { id: true, password: true, email: true, isAdmin: true },
    });

    if (!reader) {
      console.log('User not found in database');
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    console.log('User found in database:', {
      id: reader.id,
      email: reader.email,
      isAdmin: reader.isAdmin,
    });

    const isMatch = await bcryptjs.compare(req.body.password, reader.password);
    console.log(isMatch);
    console.log(req.body.password, reader.password);

    if (isMatch) {
      const token = jwt.sign(
        { readerId: reader.id, email: reader.email, isAdmin: reader.isAdmin },
        'bomba',
        { expiresIn: '1h' }
      );

      console.log('JWT created successfully');

      res.json({
        success: true,
        token: token,
      });
    } else {
      console.log('Password does not match');
      res.status(401).json({
        success: false,
        message: 'Incorrect password',
      });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during login',
    });
  }
});

module.exports = router;
