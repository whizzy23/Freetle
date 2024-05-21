const express = require('express')
const { loginUser, signupUser, getUser, updateUser } = require('../controller/userController')
const requireAuth  = require('../middleware/requireAuth')
const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// require authentication for all routes
router.use(requireAuth)

// get user details
router.get('/details', getUser )

// update user details
router.patch('/update', updateUser )

module.exports = router