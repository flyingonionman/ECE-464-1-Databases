const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Username is required']
  },
  link: {
    type: String,
    required: [true, 'Link is required']
  },
  rank: {
    type: String,
    required: [true, 'Rank is required']
  },
  exp: {
    type: String,
    required: [true, 'Link is required']
  },
  level: {
    type: String,
    required: [true, 'Link is required']
  }
})

module.exports = userSchema