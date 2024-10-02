const express = require('express')
const { loginUser, signupUser, getUser, updateUser, generateOTP, verifyOTP } = require('../controller/userController')
const requireAuth  = require('../middleware/requireAuth')
const router = express.Router()

// login route
router.post('/login', loginUser)

// generate otp route
router.post('/generateotp', generateOTP);

// verify otp route
router.post('/verifyotp', verifyOTP);

// signup route
router.post('/signup', signupUser)

// require authentication for all routes
router.use(requireAuth)

// get user details
router.get('/details', getUser )

// update user details
router.patch('/update', updateUser )

module.exports = router