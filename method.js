let jwt = require('jsonwebtoken')
module.exports.ensureToken = function (token) {
  return jwt.verify(token, 'books', (err, result) => {
    console.log(result);
    return result;
  })

}