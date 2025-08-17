const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware')

const router = express.Router();

// register
router.post('/register', register);

//  login
router.post('/login', login);

// auth/me
router.get('/me', protect, getMe);

module.exports = router;