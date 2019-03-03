var mongoose = require('mongoose');
var usersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  updateDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  status: {
    type: String,
    default: 'user',
    required: true
  }
}, {
  versionKey: false
})

var users = mongoose.model('users', usersSchema)
module.exports = users;