
const express = require('express')
const app = express()
const mongoose = require('mongoose')


app.use(express.json())


//database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/LocalCGPSCMitra", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const db = mongoose.connection
db.on('error', (error) => {
    console.log(error)
})
db.once('open', () => {
    console.log('Connected to mongoDb')
})


//routes
app.get('/', (req, res) => {
    res.send('aao aao')
})

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

const postsRouter = require('./routes/posts')
app.use('/posts', postsRouter)


app.listen(process.env.PORT || 3000, () => {
    console.log("listening to port 3000")
})




