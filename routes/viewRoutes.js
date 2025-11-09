const express = require('express');
const ViewController = require('../controllers/viewController');
const { isLoggedIn } = require('../middleware/auth');
const { redirectIfNotLoggedIn } = require('../middleware/authView');

const router = express.Router();

router.get('/login', ViewController.login);
router.get('/register', ViewController.register);
router.get('/profile', ViewController.profile);

router.get('/', ViewController.home);

module.exports = router;
