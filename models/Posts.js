const mongoose = require('mongoose')
const Comment = require('./Comment')

const postSchema = new mongoose.Schema({

    id: {
        type: Number,
        required: true,
        unique: true
    },
    postedBy: {
        type: Number,
        required: true
    },
    likes: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    title: {
        type: String,
        required: true
    },
    postType: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
        contentType: String
    },
    link: { 
        type: String
     },
    description: {
        type: String
    }
})


module.exports = mongoose.model('Post', postSchema)