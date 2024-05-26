const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '7d' })
}

// signup a user
const signupUser = async (req, res) => {
  const {name, email, password,confirmPassword} = req.body

  try {
    const user = await User.signup(name, email, password, confirmPassword)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({name, email, token})
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

    res.status(200).json({email, token})
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

module.exports = { signupUser, loginUser, getUser, updateUser }