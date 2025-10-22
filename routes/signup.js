const express = require('express');
const router = express.Router();
const prisma = require('../lib/client');
const bcryptjs = require('bcryptjs');
const { signup } = require('../controllers/loginController');

router.post('/', signup);

module.exports = router;
