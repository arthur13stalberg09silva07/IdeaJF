const express = require('express');
const AuthController = require('../controllers/authController');
const { isLoggedIn } = require('../middleware/auth');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', isLoggedIn, AuthController.logout);
router.get('/profile', isLoggedIn, AuthController.getProfile);

module.exports = router;