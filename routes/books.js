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

router.get('/select', (req, res) => {
  res.render('select', {
    title: 'หนังสือที่เลือก'
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

router.post('/add', (req, res) => {
  let fileUpload = req.files.photo;
  let fileName = `${Date.now()}.jpg`
  let path = 'public/images/upload' + fileName;
  fileUpload.mv(path, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    new books({
      isbn: req.body.isbn,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      path: path,
      name: fileName,
      amount: req.body.amount
    }).save((err) => {
      err ? res.json(err) : res.redirect('/books');
    })
  })

})

router.param('id', (req, res, next, id) => {
  books.findById(id, (err, dbBooks) => {
    err ? res.json(err) : req.booksId = dbBooks
    next();
  })
})


router.get('/:id', (req, res) => {

  books.find((err, dbBooks) => {
    res.render('books', {
      title: 'รายการหนังสือ',
      data: dbBooks,
      bookData: req.booksId
    })
  })
})

router.get('/edit/:id', (req, res) => {
  res.render('edit', {
    bookData: req.booksId
  })
})


router.post('/update/:id', (req, res) => {
  books.findByIdAndUpdate({
    _id: req.params.id
  }, {
    isbn: req.body.isbn,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description
  }, {
    new: true
  }, (err, dbBooks) => {
    err ? res.json(err) : res.redirect('/books')
  })
})


router.post('/delete/:id', (req, res) => {
  books.findByIdAndDelete({
    _id: req.params.id
  }, (err, dbBooks) => {
    err ? res.json(err) : res.redirect('/books');
  })
})


module.exports = router;