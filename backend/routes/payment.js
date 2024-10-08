const express = require('express');
const router = express.Router();
const { create_order, verify_payment } = require('../controller/paymentController');

// Route to create Razorpay order
router.post('/createOrder', create_order);

// Route to verify Razorpay payment
router.post('/verifyPayment', verify_payment);

module.exports = router;
