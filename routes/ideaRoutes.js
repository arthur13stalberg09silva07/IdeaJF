const express = require('express');
const IdeaController = require('../controllers/ideaController');
const { isLoggedIn } = require('../middleware/auth');
const { isAuthor } = require('../middleware/authorization');

const router = express.Router();

router.get('/', IdeaController.getAllIdeas);
router.get('/my-ideas', isLoggedIn, IdeaController.getMyIdeas); // Rota mais específica
router.get('/:id', IdeaController.getIdeaById); // Rota mais genérica

router.post('/', isLoggedIn, IdeaController.createIdea);
router.put('/:id', isLoggedIn, isAuthor, IdeaController.updateIdea);
router.delete('/:id', isLoggedIn, isAuthor, IdeaController.deleteIdea);

module.exports = router;
