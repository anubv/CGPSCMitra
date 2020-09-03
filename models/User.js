const mongoose = require('mongoose')
const Post = require('./Posts')

const userSchema = new mongoose.Schema({

    id: {
        type: Number,
        unique: true,
        default: 0,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
    },
    phone: {
        type: Number,
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
    googleId: {
        type: String,
    },
    facebookId: {
        type: String,
    },
    twitterId: {
        type: String,
    },
    points: {
        type: Number,
        min: 0
    },
    postsId: {
        type: [Number]
    },
    savedPostsId: {
        type: [Number]
    }
})

module.exports = mongoose.model('User', userSchema)