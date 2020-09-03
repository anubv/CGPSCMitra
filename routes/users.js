const express = require('express')
const usersRouter = express.Router()
const User = require('../models/User')


//get
usersRouter.get('/', async (req, res) => {
    try {
        const users = await User.find().limit(0).sort({ x: -1 })
        if (users == null)
            return res.status(400).json({ message: "cant find user" })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})



//getone
usersRouter.get('/:id', getUser, async (req, res) => {
    res.status(200).json(res.user)
})

//post
usersRouter.post('/', async (req, res) => {


    try {
        const tempUsers = await User.find().limit(1).sort({$natural: -1})
        const tempUserId = tempUsers[0].id + 1
        const user = new User({
            id: tempUserId,
            name: req.body.name
        })
        const tempUser = await user.save()
        res.status(200).json(tempUser)
    } catch (error) {
        res.status(500).json({
            message: "error occured",
            error: error.message
        })
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