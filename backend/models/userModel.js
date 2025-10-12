const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  penName:{
    type: String,
    default: ''
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  bio:{
    type: String,
    default: ''
  },
  purchasedBooks:{
    type: [String],
    default: []
  }
})

// static signup method
userSchema.statics.signup = async function(name,email,password,confirmPassword) {

  // validation
  if (!name || !password || !confirmPassword) {
    throw Error('All fields must be filled')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password must be at least 8 characters long and contain at least one lowercase, one uppercase, one number and one special character')
  }
  if (password !== confirmPassword) {
    throw Error('Passwords do not match')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ name, email, password: hash})

  return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Email not found')
  }
  
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect login credentials')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)