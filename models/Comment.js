const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    likes: {
        type: Number,
        required: true
    },
    postedBy:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Comment', commentSchema)