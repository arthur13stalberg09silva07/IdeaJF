const express = require('express');
const ViewController = require('../controllers/viewController');
const { redirectIfNotLoggedIn } = require('../middleware/authView');

const router = express.Router();

router.get('/create', ViewController.createIdea); 
router.get('/edit/:id', ViewController.editIdea);
router.get('/:id', ViewController.viewIdea);

module.exports = router;
