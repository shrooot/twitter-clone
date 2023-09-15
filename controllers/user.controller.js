const User = require('../models/User.model');
const RelationsModel = require('../models/Relations.model')
const { generateToken } = require('../utils/auth');
const { encryptPassword, comparePassword } = require('../utils/encodePassword');
const TweetsModel = require('../models/Tweets.model');

exports.createUser = async (req, res) => {
    try {
        const userData = req.body;

        let checkUser = await User.findOne({ username: userData.username })
        if (checkUser !== null)
            return res.status(400).send("User already exists")

        let hashed_password = await encryptPassword(req.body.password)
        const newUser = await User.create({
            username: userData.username,
            password: hashed_password
        })
        let user = await newUser.save();
        user = user.toObject()
        delete user.password
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

exports.loginUser = async (req, res) => {
    try {
        const loginData = req.body;
        console.log(loginData)
        let user = await User.findOne({ username: loginData.username })
        const matchpass = await comparePassword(loginData.password, user.password);

        if (!matchpass) {
            throw new Error("Wrong Password")
        }
        else {
            user = user.toObject()
            const token = await generateToken({ userId: user._id })
            user.token = token;
            delete user.password
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json(user)
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie('token', { httpOnly: true })
        res.status(200).send("Logout Successfull")
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

exports.followUser = async (req, res) => {
    try {
        const followedId = req.body.followedId
        const follower = req.user._id
        const newRelation = await RelationsModel.create({
            follower: follower,
            followed: followedId
        })
        let relation = await newRelation.save()
        res.status(200).json(relation)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

exports.unFollowUser = async (req, res) => {
    try {
        const followedId = req.body.followedId
        const follower = req.user._id
        await RelationsModel.deleteOne({
            follower: follower,
            followed: followedId
        })
        res.status(200).send("Unfollow successfull")
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

exports.getFollowing = async (req, res) => {
    try {
        const userId = req.user._id;
        const followed = await RelationsModel
            .find({ follower: userId })
            .select('followed -_id').populate('followed', 'username')

        const followedIds = followed.map(result => result.followed);

        res.status(200).json(followedIds)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        const followed = await RelationsModel
            .find({ follower: userId })
            .select('followed -_id');

        const followedIds = followed.map(result => result.followed);
        followedIds.push(userId)
        
        const users = await User.find({ _id: { $nin: followedIds } }).select('username')
        console.log(users)
        res.status(200).json(users)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

exports.getUserFeed = async (req, res) => {
    try {
        const userId = req.user._id;
        const followed = await RelationsModel
            .find({ follower: userId })
            .select('followed -_id');

        const followedIds = followed.map(result => result.followed);
        console.log(followedIds)
        const feedTweets = await TweetsModel.find({ user: { $in: followedIds } }).populate('user', 'username').sort({createdAt: -1})

        res.status(200).json(feedTweets)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}