const functions = require('firebase-functions');
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
var app = express();

app.use(cors({
  origin: true
}))

app.get('/', (req, res) => {
  res.send('ok');
})

app.get('/check', (req, res) => {
  jwt.verify(req.headers.token, 'books', function (err, decode) {
    if (err) return res.status(200).send({
      auth: false,
      message: 'Failed to authenticate token'
    });
    res.status(200).send(JSON.stringify({
      ok: true,
      message: "Login successful",
      decode
    }));
  });
})

exports.jwt = functions.https.onRequest(app);