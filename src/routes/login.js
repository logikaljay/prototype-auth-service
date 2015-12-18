var Cache = require('../lib/cache')
var JWT = require('jsonwebtoken')
var uuid = require('node-uuid')

var secret = "TOPSECRET"

var internals = {
    method: 'POST',
    path: '/',
    handler: (request, reply) => {
        // validate the request
        try {
            ['userName', 'password'].forEach((required) => {
                if ( ! request.payload.hasOwnProperty(required)) {
                    throw String.format('%s required', required)
                }
            })
        }
        catch (ex) {
            reply({ error: ex ? ex.toString() : String.denied }).code(400)
        }

        // validate the user with some third party
        var valid = true
        var data = uuid.v4().split('-')
        var userId = data[0]
        var sessionId = uuid.v4()
        var email = data[1] + "@" + data[2] + ".net"

        if (valid) {
            var cache = Cache.instance
            
            // generate a token from the result of the third party
            var token = JWT.sign({ email, userId, sessionId }, secret)
            var key = token.substring(token.length - 12, 9)
            
            // whitelist this token in redis
            cache.set(userId, token)
            
            // reply with the token
            reply({ userId, token })
        }
        else {
            reply({ error: String.denied }).code(400)
        }

    }
}

module.exports = internals