var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var books = mongoose.model('books');

router.get('/', (req, res) => {
  books.find((err, dbBooks) => {
    res.render('books', {
      title: 'รายการหนังสือ',
      data: dbBooks
    })
  })
})

router.post('/search', (req, res) => {
  books.find({
    title: {
      $regex: req.body.q
    }
  }, (err, dbBooks) => {
    res.render('books', ({
      'title': 'รายการหนังสือ',
      data: dbBooks
    }))
  })
})

router.get('/add', (req, res) => {
  res.render('add', {
    title: 'เพิ่มหนังสือใหม่'
  })
})

// router.post('/add', (req, res) => {
//   new books({
//     isbn: req.body.isbn,
//     title: req.body.title,
//     price: req.body.price
//   }).save((err) => {
//     err ? res.json(err) : res.redirect('/books');
//   })
// })

router.post('/add', (req, res) => {
  new books({
    isbn: req.body.isbn,
    title: req.body.title,
    price: req.body.price
  }).save((err) => {
    err ? res.json(err) : res.redirect('/books');
  })
})

router.param('id', (req, res, next, id) => {
  books.findById(id, (err, dbBooks) => {
    err ? res.json(err) : req.booksId = dbBooks
    next();
  })
})

// router.param('id', (req, res, next, id) => {
//   books.findById(id, (err, dbBooks) => {
//     err ? res.json(err) : req.booksId = dbBooks
//     next();
//   })
// })

router.get('/:id', (req, res) => {
  res.render('detail', {
    bookData: req.booksId
  })
})

// router.get('/:id', (req, res) => {
//   res.render('detail', {
//     bookData: req.booksId
//   })
// })

// router.get('/edit/:id', (req, res) => {
//   res.render('edit', {
//     bookData: req.booksId
//   })
// })
router.get('/edit/:id', (req, res) => {
  res.render('edit', {
    bookData: req.booksId
  })
})

// router.post('/:id', (req, res) => {
//   books.findByIdAndUpdate({
//     _id: req.params.id
//   }, {
//     isbn: req.body.isbn,
//     title: req.body.title,
//     price: req.body.price
//   }, {
//     new: true
//   }, (err, dbBooks) => {
//     err ? console.log(err) : res.redirect('/books');
//   })
// })

router.post('/:id', (req, res) => {
  books.findByIdAndUpdate({
    _id: req.params.id
  }, {
    isbn: req.body.isbn,
    title: req.body.title,
    price: req.body.price
  }, {
    new: true
  }, (err, dbBooks) => {
    err ? res.json(err) : res.redirect('/books')
  })
})
// router.post('/deletebook/:id', (req, res) => {
//   books.findByIdAndRemove({
//     _id: req.params.id
//   }, (err, dbBooks) => {
//     err ? res.json(err) : res.redirect('/books');
//   })
// })


router.post('/deletebook/:id', (req, res) => {
  books.findByIdAndDelete({
    _id: req.params.id
  }, (err, dbBooks) => {
    err ? res.json(err) : res.redirect('/books');
  })
})
module.exports = router;