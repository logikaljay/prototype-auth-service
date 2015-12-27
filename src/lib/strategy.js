var JWT = require('jsonwebtoken')
var Cache = require('./cache')
var cache = Cache.instance
var users = require('../users.json')
var secret = "TOPSECRET"

module.exports = {
    allowQueryToken: false,

    allowMultipleHeaders: false,
    
    accessTokenName: 'access_token',

    validateFunc: (token, callback) => {
        JWT.verify(token, secret, (err, token) => {
            if (typeof token !== 'undefined') {
                return callback(null, true, { token })
            }
            else {
                return callback(null, false, { token })
            }
        })
    }
}