var JWT = require('jsonwebtoken')
var Cache = require('./cache')
var cache = Cache.instance
var secret = "TOPSECRET"

module.exports = (token, cb) => {
    // decode the token
    var decoded = JWT.verify(token, secret)
}