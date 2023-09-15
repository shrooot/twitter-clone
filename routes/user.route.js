const express = require('express')
const { createUser, loginUser, logoutUser, followUser, unFollowUser, getUserFeed, getFollowers, getAllUsers, getFollowing } = require('../controllers/user.controller')
const { authenticateJwt } = require('../utils/auth')

const router = express.Router()

router.post('/signup', createUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.post('/follow', authenticateJwt, followUser)
router.post('/unfollow', authenticateJwt, unFollowUser)
router.get('/get-feed', authenticateJwt, getUserFeed)
router.get('/get-following', authenticateJwt, getFollowing)
router.get('/get-all-users', authenticateJwt, getAllUsers)
router.get('/get-userinfo', authenticateJwt, (req, res) => {
    res.status(200).json({ userId: req.user._id, username: req.user.username })
})


router.get('/check', authenticateJwt, (req, res) => {
    res.send("successfull")
})
module.exports = router