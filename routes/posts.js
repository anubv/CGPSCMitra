const express = require('express')
const Post = require('../models/Posts')
const postsRouter = express.Router();

//get
postsRouter.get('/', async (req, res) => {
    let posts
    try {
        posts = await Post.find().limit(parseInt(req.query.limit)).sort({ x: -1 })
        if (posts == null) {
            return res.status(404).json({ message: "No posts exist" })
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get one 
postsRouter.get('/:id', getPost, (req, res) => {
    res.json(res.post)
})

//posts
postsRouter.post('/', async (req, res) => {

    const post = new Post({
        id: req.body.id,
        postedBy: req.body.postedBy,
        likes: req.body.likes,
        title: req.body.title,
        postType: req.body.postType
    })
    try {
        const tempPost = await post.save()
        res.status(200).json(tempPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

//deleteOne
postsRouter.delete('/:id',  async (req, res) => {
    try {
        let post
        post = await Post.find({id: req.params.id}).remove()
        res.status(200).send('Deleted post')
    } catch (error) {
        res.status(500).json(error.message)
    }
})

async function getPost(req, res, next) {

    let post
    try {
        post = await Post.find({ id: req.params.id })
        if (post == null)
            return res.status(404).json({
                message: "No such post exist"
            })

    } catch (error) {
        res.status(500).json(error)
    }
    res.post = post
    next()
}

module.exports = postsRouter