const express = require('express')
const Post = require('../models/Posts')
const postsRouter = express.Router();
const User = require('../models/User')

//get
postsRouter.get('/', async (req, res) => {
    let posts
    try {
        const from = req.query.from
        if (from == -1 || from == null)
            posts = await Post.find().limit(parseInt(req.query.limit)).sort({ $natural: -1 })
        else
            posts = await Post.find({
                id: {
                    $lt: from
                }
            }).limit(parseInt(req.query.limit)).sort({ $natural: -1 })

        if (posts == null) {
            return res.status(404).json({ message: "No posts exist" })
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get one 
postsRouter.get('/:id', getPost, async (req, res) => {
    if(res.post!=null)
    res.json(res.post)
})


//posts
postsRouter.post('/', async (req, res) => {

    try {
        const lastPost = await Post.find().limit(1).sort({$natural: -1})
        let PostId
        PostId=lastPost[0].id + 1
        
        const post = new Post({
            id: PostId,
            postedBy: req.body.postedBy,
            likes: req.body.likes,
            title: req.body.title,
            description: req.body.description
        })        
   
         const tempPost = await post.save()
   
        if(tempPost==null)
            res.send(400).json("could not create post")
        else
        res.status(201).json(tempPost)
   
    } catch (error) {
        res.status(500).json({
            message: "error occured",
            error: error.message
        })
    }
})

//deleteOne
postsRouter.delete('/:id', async (req, res) => {
    try {
        let post
        post = await Post.find({ id: req.params.id }).remove()
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