const mongoose = require('mongoose')

const Schema = mongoose.Schema

const relationsSchema = new Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    followed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

module.exports = mongoose.model('Relations', relationsSchema)