var mongoose = require('mongoose')

var selectsSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
  },
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  selectAmount: {
    type: Number,
    defalut: 1
  },
  online: {
    type: Boolean,
  },
  sum: {
    type: Number,
  },
  payment: {
    type: Boolean
  },
  dateThai: {
    type: String,
    required: true
  },
  selectDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  friendSend: Boolean,
  emailFriend: String,
  description: String,
  pathOnline: String,
  nameOnline: String,
  path: String,
  name: String
}, {
  versionKey: false
})
var selects = mongoose.model('selects', selectsSchema);
module.exports = selects;