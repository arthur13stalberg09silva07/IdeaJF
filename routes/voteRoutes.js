const express = require('express');
const VoteController = require('../controllers/voteController');
const { isLoggedIn } = require('../middleware/auth');

const router = express.Router();

router.post('/vote', isLoggedIn, VoteController.vote);
router.post('/remove-vote', isLoggedIn, VoteController.removeVote);
router.get('/check/:idea_id', isLoggedIn, VoteController.checkVote);

module.exports = router;