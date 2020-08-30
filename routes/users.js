const express = require('express')
const usersRouter = express.Router()


usersRouter.get('/', (req,res)=>{
    res.send("you are seeing a lot of users")
})

module.exports = usersRouter