const express = require('express')
const router = express.Router()
const { stories_index , story_details , story_create_post , story_delete , story_update } = require('../controller/storyController')
const requireAuth  = require('../middleware/requireAuth')

// require authentication for all routes
router.use(requireAuth)

// GET all stories
router.get('/', stories_index)

// POST a new story
router.post('/createStory', story_create_post)

// GET a single story
router.get('/story/:id', story_details)  

// DELETE a story
router.delete('/story/:id', story_delete)

// UPDATE a story
router.patch('/story/:id', story_update)

module.exports = router