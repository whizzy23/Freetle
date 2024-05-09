require('dotenv').config()
storiesRoutes = require('./routes/stories')

const express = require('express')
const mongoose = require('mongoose')

// express app
const app = express()

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

//routes
app.get('/',(req,res) => {
    res.redirect('/api/stories')
})

//workout routes
app.use('/api/stories',storiesRoutes)
