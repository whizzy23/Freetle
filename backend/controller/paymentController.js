const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/paymentModel');

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order
const create_order = async (req, res) => {
  const { amount } = req.body;

  try {
    // Options for Razorpay order creation
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise (multiply by 100)
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex'), // Generate random receipt ID
    };

    // Create order using Razorpay instance
    const order = await razorpayInstance.orders.create(options);

    // Send the order details back to the client
    res.status(200).json({ data: order });
  } catch (error) {
    console.error('Error creating Razorpay order:', error.message);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

// Verify Payment
const verify_payment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    // Generate the expected signature to verify the authenticity of the payment
    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSign = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest('hex');

    // Compare the generated signature with the Razorpay signature
    const isAuthentic = expectedSign === razorpay_signature;

    if (isAuthentic) {
      // Save payment details if verification is successful
      const payment = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      await payment.save(); // Save the payment details in the database

      // Create purchase record for the user
      const user = req.user;
      user.purchasedBooks.push(req.body.bookId);
      await user.save(); // Save the updated user details

      // Send success response to the client
      res.status(200).json({ message: 'Payment Verified Successfully' });
    } else {
      // Send verification failure response
      res.status(400).json({ message: 'Payment Verification Failed' });
    }
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error.message);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

module.exports = { create_order, verify_payment };