const express = require('express')
const usersRouter = express.Router()
const User = require('../models/User')






//getone
usersRouter.get('/:id', getUser, async (req, res) => {
    res.status(200).json(res.user)
})


//get
usersRouter.get('/', async (req, res) => {
    let users
    try {
        if (null != req.query.username || null != req.query.password) {

            if (null == req.query.username || null == req.query.password) {
                throw new Error("username or password required")
            } else {
                users = await User.find({
                    "username": req.query.username,
                })
                const user = users[0]
                if (null == user) {
                    throw new Error(
                        "No user found"
                    )
                } else {
                    if (req.query.password == user.password)
                        res.json(user)
                    else
                        throw new Error('password incorrect')
                }
            }
        } else {
            users = await User.find()
            res.json(users)
        }
    }
    catch (error) {
        res.status(500).json({"message" : error.message})
    }
})

//post
usersRouter.post('/', async (req, res) => {
    let user
    try {
        if (null == req.body.password && null == req.body.googleId) {
            throw new Error("must have a password or googleId")
        } else {
            const lastUser = await User.find().limit(1).sort({ $natural: -1 })
            const tempUserId = lastUser[0].id + 1
            user = new User({
                id: tempUserId,
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
            })
        }

        const tempUser = await user.save()
        res.status(200).json(tempUser)
    } catch (error) {
        if (error.code == 11000)
            res.json({ "error": "username already exits" })
        else
            res.json({ "error": error.message })
    }
})


//deleteOne
usersRouter.delete('/:id', async (req, res) => {
    try {
        await User.find().remove()
        res.send('deleted')
    } catch (error) {
        res.json(error.message)
    }
})

async function getUser(req, res, next) {
    let user
    try {
        user = await User.find({ id: req.params.id })
        if (user == null)
            return res.status(404).send('no user exists')

    } catch (error) {
        res.status(500).json(error)
    }

    res.user = user
    next()
}




module.exports = usersRouter