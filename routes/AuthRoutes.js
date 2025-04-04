const express = require('express');
const router = express.Router();

const { register, login } = require('../controller/Authcontroller');

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

module.exports = router;
