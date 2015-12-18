var Cache = require('../lib/cache')
var JWT = require('jsonwebtoken')

var secret = "TOPSECRET"

var internals = {
    method: 'GET',
    path: '/secure',
    handler: (request, reply) => {
        // validate the request
        var auth
        try {
            auth = request.headers.authorization.split(' ')
            if (auth[0].toLowerCase() !== 'bearer' || auth.length < 2) {
                throw String.denied
            }
        }
        catch (ex) {
            reply({ error: ex ? ex.toString() : String.denied }).code(400)
        }
        
        // decode the token
        JWT.verify(token, secret, (err, token) => {
            if (err) {
                reply({ error: String.denied }).code(400)
            }
            else {
                reply({token})
            }
        })
    }
}

module.exports = internals