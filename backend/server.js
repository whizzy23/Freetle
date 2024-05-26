require('dotenv').config()
const storiesRoutes = require('./routes/stories')
const contactRoutes = require('./routes/contact')
const bookmarkRoutes = require('./routes/bookmark')
const userRoutes = require('./routes/user')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// express app
const app = express()
app.use(cors())

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(result => {
        app.listen(process.env.PORT, () => {
        console.log('Connected to db and listening on port', process.env.PORT)
        })
    })
    .catch(err => console.log( 'Error detected while connecting to database' , err ))

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path , req.method)
  next()
})

// routes
app.get('/',(req,res) => {
    res.redirect('/api/stories')
})

app.use('/api/user', userRoutes)

// stories routes
app.use('/api/stories',storiesRoutes)

// contact message routes
app.use('/api/contact',contactRoutes)

// boookmark routes
app.use('/api/bookmarks',bookmarkRoutes)