const express = require('express')
const router = express.Router()
const { comments_index, comment_create_post, comment_delete, comment_delete_all } = require('../controller/commentController')
const requireAuth  = require('../middleware/requireAuth')

// require authentication for all routes
router.use(requireAuth)

// GET all comments for a story
router.get('/:id', comments_index)

// POST a new comment
router.post('/:id/createComment', comment_create_post)

// DELETE a comment
router.delete('/:id', comment_delete)

// DELETE all comments for a story
router.delete('/:id/deleteAll', comment_delete_all)

module.exports = router