const express = require('express');
const router = express.Router();
const prisma = require('../lib/client');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { login } = require('../controllers/loginController');

router.post('/', login);

module.exports = router;
