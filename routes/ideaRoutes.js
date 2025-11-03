const express = require('express');
const IdeaController = require('../controllers/ideaController');
const { isLoggedIn } = require('../middleware/auth');
const { isAuthor } = require('../middleware/authorization');

const router = express.Router();

router.get('/', IdeaController.getAllIdeas);
router.get('/my-ideas', isLoggedIn, IdeaController.getMyIdeas);
router.get('/:id', IdeaController.getIdeaById);
router.post('/', isLoggedIn, IdeaController.createIdea);
router.put('/:id', isLoggedIn, isAuthor, IdeaController.updateIdea);
router.delete('/:id', isLoggedIn, isAuthor, IdeaController.deleteIdea);

module.exports = router;