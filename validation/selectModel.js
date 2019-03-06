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
  sum: {
    type: Number,
    require: true
  },
  selectDate: {
    type: Date,
    required: true,
    default: Date.now
  }
}, {
  versionKey: false
})
var selects = mongoose.model('selects', selectsSchema);
module.exports = selects;