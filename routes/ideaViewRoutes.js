const express = require('express');
const ViewController = require('../controllers/viewController');
const { redirectIfNotLoggedIn } = require('../middleware/authView');

const router = express.Router();

// Rotas de View para Ideias
router.get('/create', ViewController.createIdea); // Removido redirectIfNotLoggedIn
router.get('/edit/:id', ViewController.editIdea); // Removido redirectIfNotLoggedIn
router.get('/:id', ViewController.viewIdea);

module.exports = router;
