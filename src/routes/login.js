var Cache = require('../lib/cache')
var JWT = require('jsonwebtoken')
var uuid = require('node-uuid')
var crypto = require('crypto')
var users = require('../users.json')
var secret = "TOPSECRET"

var internals = {
    method: 'POST',
    path: '/',
    handler: (request, reply) => {
        var user
        // validate the request
        try {
            if (request.payload === null) {
                throw 'Missing fields'
            }
            
            ['userName', 'password'].forEach((required) => {
                if ( ! request.payload.hasOwnProperty(required)) {
                    throw String.format('%s required', required)
                }
            })
            
            user = users.filter((user) => {
                return user.userName.toLowerCase() === request.payload.userName.toLowerCase()
            })[0]
            
            if ( ! user || crypto.createHash('sha256').update(request.payload.password).digest('hex') !== user.secret) {
                throw ''
            }
        }
        catch (ex) {
            reply({ error: ex ? ex.toString() : String.denied }).code(401)
            return
        }

        // generate a sessionId
        var sessionId = uuid.v4().split('-').join('')

        if (user) {
            var cache = Cache.instance
            
            // generate a token from the result of the third party
            var token = JWT.sign({ userName: user.userName, userId: user.userId, sessionId }, secret)
            
            // whitelist this token in redis
            cache.set(user.userId, { sessionId, token })
            
            // reply with the token
            reply({ userId: user.userId, token })
        }
        else {
            reply({ error: String.denied }).code(400)
        }

    }
}

module.exports = internals