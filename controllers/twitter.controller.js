const TweetsModel = require("../models/Tweets.model");

exports.createTweet = async (req, res) => {
    try {
        let tweetData = req.body;
        console.log(req.user)
        tweetData.user = req.user._id;
        let newTweet = await TweetsModel.create(tweetData);
        const tweet = await newTweet.save();
        res.status(200).send(tweet)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

exports.udpateTweet = async (req, res) => {
    try {
        const tweetData = req.body;
        const userId = req.user._id;
        const tweet = await TweetsModel.findById(tweetData.tweetId);
        if (tweet === null)
            res.status(400).send("Tweet not found")
        else if (tweet.user.toString() !== userId.toString())
            res.status(403).send("Invalid Access")
        else {
            await TweetsModel.findOneAndUpdate({ _id: tweetData.tweetId }, tweetData)
            const updatedTweet = await TweetsModel.findById(tweetData.tweetId);
            res.status(200).json(updatedTweet)
        }
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

exports.deleteTweet = async (req, res) => {
    try {
        const tweetId = req.params.tweetId;
        const userId = req.user._id;
        const tweet = await TweetsModel.findById(tweetId);
        if (tweet === null)
            res.status(400).send("Tweet not found")
        else if (tweet.user.toString() !== userId.toString())
            res.status(403).send("Invalid Access")
        else {
            await TweetsModel.deleteOne({ _id: tweetId })
            res.status(200).send("Tweet deleted")
        }
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

exports.getAllTweets = async (req, res) => {
    try {
        const userId = req.user._id;
        let tweets = await TweetsModel.find({ user: userId }).populate('user','username');
        res.status(200).json(tweets)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

exports.getTweetById = async (req, res) => {
    try {
        const tweetId = req.params.tweetId
        let tweet = await TweetsModel.findById(tweetId).populate('user','username');
        res.status(200).json(tweet)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}