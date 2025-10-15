const User = require('../models/userModel')
const OTP = require('../models/otpModel')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const crypto = require('crypto')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '90d' })
}

// Send OTP to user's email
const sendOTP = async (email, OTP) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    }
  });

  let mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Email Verification for Freetle',
    text: `Your OTP is ${OTP} and it expires in 5 minutes`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP sent successfully');
  } 
  catch (error) {
    console.error('Error sending OTP:', error);
  }
};

// OTP Verification Route
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if ( !otpRecord || otpRecord.storedOTP !== otp ) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
    res.status(200).json({ message: 'OTP verified successfully' });
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// OTP Generation Route
const generateOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const userExists = await User.findOne({email});
    if (userExists) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    const otp = crypto.randomInt(100000, 999999).toString();
    await OTP.create({ email, storedOTP: otp });
    await sendOTP(email, otp);
    res.status(200).json({ message: 'OTP sent successfully' });
  }
  catch (error) {
    res.status(400).json({ error: error.message});
  }
};

// signup a user
const signupUser = async (req, res) => {
  const {name, email, password, confirmPassword} = req.body

  try {

    const user = await User.signup(name, email, password, confirmPassword)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({name, id: user._id, email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({id: user._id, email, token})
  }
  catch (error) {
    res.status(400).json({error: error.message})
  }
}

// get user details
const getUser = async (req, res) => {
  const user_id = req.user._id;
  try {
    const user = await User.findById(user_id)
    res.status(200).json(user)
  }
  catch (error) {
    res.status(400).json({error: error.message})
  }
}

// get user's purchased books
const getUserPurchases = async (req, res) => {
  const user_id = req.user._id;
  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ purchasedBooks: user.purchasedBooks });
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update user details
const updateUser = async (req, res) => {
  const user_id = req.user._id;
  const updates = req.body;
  try {
    const user = await User.findByIdAndUpdate(user_id, updates, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    } 
    res.status(200).json(user);
  }
  catch (error) {
    res.status(400).json({ error: error.message});
  }
};


module.exports = { signupUser, loginUser, getUser, getUserPurchases, updateUser, generateOTP, verifyOTP }