const express = require('express');
const router = express.Router();
const prisma = require('../lib/client');
const bcryptjs = require('bcryptjs');
router.post('/', async (req, res, next) => {
  try {
    bcryptjs.hash('bomba', 10, async (err, hashedpassword) => {
      if (err) {
        return next(err);
      }
      const reader = await prisma.reader.findUnique({
        where: { email: req.body.email },
      });
      if (!reader) {
        await prisma.reader.create({
          data: {
            password: hashedpassword,
            email: req.body.email,
            username: req.body.username,
            isAdmin: false,
          },
        });
      } else {
        console.err('Email or Username already registered');
        next(err);
      }
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
