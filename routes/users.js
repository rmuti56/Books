var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var users = mongoose.model('users');
var passwordHash = require('password-hash');

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

router.post('/login', async (req, res) => { //
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
    res.redirect('/users/success')
  }


})

module.exports = router;