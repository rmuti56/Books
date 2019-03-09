var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var books = mongoose.model('books')
/* GET home page. */
router.get('/', function (req, res, next) {
  var q = books.find().limit(4).sort({
    'sellAmount': -1
  });
  q.exec((err, dbBooks) => {
    var cheap = books.find().limit(4).sort({
      'price': 1
    });
    cheap.exec((err, result) => {
      res.render('index', {
        data: dbBooks,
        cheap: result
      })
    })
  })
})

module.exports = router;