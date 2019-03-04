var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var users = mongoose.model('users');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');

var app = express();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'User'
  })
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/success', (req, res) => {
  res.render('success', {
    title: 'ลงทะเบียนสำเร็จ'
  })
})

router.post('/register', (req, res) => { //ลงทะเบียน
  var password = passwordHash.generate(req.body.password)
  new users({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: password
  }).save(err => {
    err ? res.json(err) : res.redirect('/users/success')
  })
})

router.post('/login', async (req, res) => {

  var member = await users.findOne({
    email: req.body.loginEmail
  })
  if (!member) {
    res.render('login', {
      title: 'email'
    })
  } else if (!passwordHash.verify(req.body.loginPassword, member.password)) {
    res.render('login', {
      email: member.email
    })

  } else {
    let payload = {
      email: member.email,
      status: member.status
    }
    jwt.sign(payload, 'books', { //สร้าง token
      expiresIn: 600
    }, (err, token) => {
      res.render('success', {
        token: token,
        title: 'ลงชื่อเข้าใช้สำเร็จ'
      })
    })
  }
})
module.exports = router;