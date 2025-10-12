const express = require('express');
const router = express.Router();
const { getAllBooks } = require('../controller/bookController');
const requireAuth  = require('../middleware/requireAuth')

// require authentication for all routes
router.use(requireAuth)

router.get('/', getAllBooks);

module.exports = router;
