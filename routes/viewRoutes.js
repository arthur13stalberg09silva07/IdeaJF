const express = require('express');
const ViewController = require('../controllers/viewController');
const { isLoggedIn } = require('../middleware/auth'); 
const router = express.Router();

router.get('/login', ViewController.login);
router.get('/register', ViewController.register);
router.get('/profile', isLoggedIn, ViewController.profile); 

router.get('/', ViewController.home);
router.get('/create', isLoggedIn, ViewController.createIdea); 
router.get('/edit/:id', isLoggedIn, ViewController.editIdea); 
router.get('/:id', ViewController.viewIdea);

module.exports = router;
