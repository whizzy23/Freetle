const express = require('express');
const router = express.Router();
const { bookmarks_index , add_bookmark, delete_bookmark } = require('../controller/bookmarkController')
const requireAuth  = require('../middleware/requireAuth')

// require authentication for all routes
router.use(requireAuth)

// GET all bookmarks
router.get('/', bookmarks_index)

// ADD a new bookmark
router.post('/add', add_bookmark)

// DELETE a bookmark
router.delete('/:id', delete_bookmark)

module.exports = router