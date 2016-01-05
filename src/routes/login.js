var Cache = require('../lib/cache')
var JWT = require('jsonwebtoken')
var uuid = require('node-uuid')
var crypto = require('crypto')

// temp - load all users from a "database"
var users = require('../users.json')

// temp - maybe use a private/public key pair in the future?
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

            // get the user
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
            // generate a token from the result of the third party
            var token = JWT.sign({ userName: user.userName, userId: user.userId, sessionId }, secret) 
            var cache = Cache.instance

            if ( ! cache) {
                cache = new Cache()
                cache.connect()
                    .then(() => {
                        // whitelist this token in redis
                        cache.set(user.userId, { sessionId, token })

                        // reply with the token
                        reply({ userId: user.userId, token })
                    })
            }
            else {
                // whitelist this token in redis
                cache.set(user.userId, { sessionId, token })
                
                // reply with the token
                reply({ userId: user.userId, token })
            }
        }
        else {
            reply({ error: String.denied }).code(400)
        }

    }
}

module.exports = internals