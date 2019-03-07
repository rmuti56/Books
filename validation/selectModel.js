var mongoose = require('mongoose')
var selectsSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  selectAmount: {
    type: Number,
    required: true,
    defalut: 1
  },
  online: {
    type: Boolean,
  },
  sum: {
    type: Number,
    require: true
  },
  payment: {
    type: Boolean
  },
  selectDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  pathOnline: String,
  nameOnline: String,
  path: String,
  name: String
}, {
  versionKey: false
})
var selects = mongoose.model('selects', selectsSchema);
module.exports = selects;