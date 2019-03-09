var mongoose = require('mongoose');
var booksSchema = mongoose.Schema({
    isbn: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
    },
    online: {
      type: Boolean,
    },
    pathOnline: String,
    nameOnline: String,
    sellAmount: Number,
    path: String,
    name: String
  }, {
    versionKey: false
  }

)

var books = mongoose.model('books', booksSchema);
module.exports = books;