var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var books = mongoose.model('books');
var select = mongoose.model('selects')
var users = mongoose.model('users')

router.get('/', (req, res) => {
  books.find((err, dbBooks) => {
    res.render('books', {
      title: 'รายการหนังสือ',
      data: dbBooks
    })
  })
})

router.get('/select', (req, res) => {
  books.find((err, dbBooks) => {
    res.render('select', {
      title: 'รายการหนังสือ',
      data: dbBooks
    })
  })
})

router.post('/select', (req, res) => {
  books.find((err, dbBooks) => {
    var email = req.body.tokenEmail
    dbBooks.forEach(item => {
      let item1 = `selectAmount${item._id}`
      let amount = req.body[item1]
      let sum = `selectSum${item._id}`
      if (amount > 0) {
        var newAmount = item.amount - amount;
        new select({
          email: email,
          isbn: item.isbn,
          title: item.title,
          price: item.price,
          selectAmount: amount,
          online: item.online,
          pathOnline: item.pathOnline,
          nameOnline: item.nameOnline,
          description: item.description,
          path: item.path,
          name: item.name,
          payment: false,
          sum: req.body[sum]
        }).save((err) => {
          if (err) {
            res.json(err);
          }
        })
        books.findByIdAndUpdate({
          _id: item._id
        }, {
          amount: newAmount
        }, {
          new: true
        }, (err) => {
          if (err) {
            res.json(err);
          }
        })
      }
    })
    res.render('success', {
      title: 'เลือกสินค้าสำเร็จ'
    })
  })
})

router.get('/status', (req, res) => {
  var email = req.query.email
  select.find({
    $and: [{
      email: email
    }, {
      payment: false
    }]
  }, (err, dbBooks) => {
    var sum = 0;
    dbBooks.forEach(item => {
      sum += (item.price * item.selectAmount)
    })
    res.render('status', {
      data: dbBooks,
      sum
    })
  })
})

router.get('/history', (req, res) => {
  var email = req.query.email
  select.find({
    $and: [{
      email: email
    }, {
      payment: true
    }]
  }, (err, dbBooks) => {
    if (dbBooks.length >= 1) {
      res.render('history', {
        data: dbBooks
      })
    } else {
      res.render('history')
    }
  })
})

router.get('/mybooks', (req, res) => {
  var email = req.query.email
  var noemail = req.query.noemail
  var id = req.query.id
  select.find({
    $and: [{
      email: email
    }, {
      payment: true
    }, {
      online: true
    }]
  }, (err, dbBooks) => {
    if (err) {
      res.json(err)
    } else {
      select.find({
        $and: [{
          email: email
        }, {
          friendSend: true
        }]
      }, (err, newDbBooks) => {
        if (err) {
          res.json(err)
        } else {
          res.render('mybooks', {
            data: dbBooks,
            newData: newDbBooks,
            noemail: noemail,
            id: id
          })
        }
      })
    }
  })
})

router.post('/mybooks', (req, res) => {
  var email = req.body.email;
  var emailFriend = req.body.emailFriend;
  var id = req.body.id;
  var title = req.body.title;
  var name = req.body.name;
  var nameOnline = req.body.nameOnline;
  var description = req.body.description;
  users.find({
    email: email
  }, (err, dbEmail) => {
    if (dbEmail.length > 0) {
      select.find({
        $and: [{
          emailFriend: emailFriend
        }, {
          email: email
        }, {
          friendSend: true
        }, {
          title: title
        }]
      }, (err, dbBooks) => {
        if (dbBooks.length > 0) {
          res.redirect('/books/mybooks?email=' + emailFriend)
        } else {
          new select({
            emailFriend: emailFriend,
            email: email,
            friendSend: true,
            title: title,
            name: name,
            nameOnline: nameOnline,
            description: description
          }).save(err => {
            err ? res.json(err) : res.redirect('/books/mybooks?email=' + emailFriend)
          })
        }
      })

    } else {
      console.log('เข้านี้นะ4')
      res.redirect('/books/mybooks?email=' + emailFriend + '&noemail=noemail&id=' + id)
    }
  })

})

router.get('/comfirm', (req, res) => {
  select.find({
    payment: false
  }, (err, dbBooks) => {
    err ? res.json(err) : res.render('payment', {
      data: dbBooks
    })
  })
})

router.post('/payment', (req, res) => {
  let id = req.body.name;
  select.findByIdAndUpdate({
    _id: id
  }, {
    payment: true
  }, {
    new: true
  }, (err) => {
    err ? res.json(err) : res.redirect('/books/comfirm')
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
  let bookUpload = req.files.fileBook;
  let fileUpload = req.files.photo;
  let fileName = `${Date.now()}.jpg`
  let path = 'public/images/upload' + fileName;
  if (bookUpload) {
    let bookName = `${Date.now()}.pdf`
    let pathOnline = 'public/images/book' + bookName;
    bookUpload.mv(pathOnline, (err) => {
      if (err) {
        return res.status(500).send(err);
      } else {
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
            online: true,
            pathOnline: pathOnline,
            nameOnline: bookName,
            amount: 10000
          }).save(err => {
            err ? res.json(err) : res.redirect('/books');
          })
        })
      }
    })
  } else {
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
        online: false,
        amount: req.body.amount
      }).save((err) => {
        err ? res.json(err) : res.redirect('/books');
      })
    })
  }
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

// router.get('/edit/:id', (req, res) => {
//   res.render('edit', {
//     bookData: req.booksId
//   })
// })


router.post('/update/:id', (req, res) => {
  console.log(req.body.amount)
  books.findByIdAndUpdate({
    _id: req.params.id
  }, {
    isbn: req.body.isbn,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    amount: req.body.amount
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