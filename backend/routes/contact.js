const express = require('express')
const router = express.Router()
const { messages_index , message_create_post , message_details} = require('../controller/contactController')
const requireAuth = require('../middleware/requireAuth')

// require authentication for all routes
router.use(requireAuth)

// GET all messages
router.get('/allMessages', messages_index)

// POST a new message
router.post('/sendMessage', message_create_post)

// GET a single message
router.get('/allMessages/message/:id', message_details) 

module.exports = router