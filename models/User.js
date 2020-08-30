const app = require('express').express()
const mongoose = require('mongoose')
const Post = require('./Posts')

const userSchema = new mongoose.Schema({

    id: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    googleId: {
        type: String,
        unique: true
    },
    facebookId: {
        type: String,
        unique: true
    },
    twitterId: {
        type: String,
        unique: true
    },
    points: {
        type: Number,
        min: 0
    },
    postsId: {
        type: [Number]
    },
    savedPostsId:{
        type: [Number]
    }
})

module.exports = mongoose.model('User', userSchema)