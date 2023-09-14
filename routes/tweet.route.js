const express = require('express')
const { authenticateJwt } = require('../utils/auth');
const { createTweet, udpateTweet, deleteTweet } = require('../controllers/twitter.controller');

const router = express.Router();

router.post('/create', authenticateJwt, createTweet)
router.put('/update', authenticateJwt, udpateTweet)
router.delete('/delete/:tweetId', authenticateJwt, deleteTweet)
router.get('/get/:tweetId')

module.exports = router
