const express = require('express');
const ViewController = require('../controllers/viewController');
const { isLoggedIn } = require('../middleware/auth'); // Middleware para API
const { redirectIfNotLoggedIn } = require('../middleware/authView'); // Middleware para Views

const router = express.Router();

// Rotas de Autenticação (Views)
router.get('/login', ViewController.login);
router.get('/register', ViewController.register);
router.get('/profile', ViewController.profile); // Removido redirectIfNotLoggedIn

// Rotas de Ideias (View Home)
router.get('/', ViewController.home);

module.exports = router;
