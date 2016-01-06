var Cache = require('../lib/cache')
var JWT = require('jsonwebtoken')

// temp - use a private/public key pair for this
var secret = "TOPSECRET"

var internals = {
    method: 'POST',
    path: '/validate',
    handler: (request, reply) => {
        try {
            // check if the payload contains a token
            if ( ! request.payload) {
                throw 'Invalid request'
            }
            else if ( ! request.payload.token) {
                throw 'No token supplied'
            }
            else if ( ! request.payload.userid) {
                throw 'No userid supplied'
            }
        }
        catch (ex) {
            reply({ error: ex }).code(401)
        }

        // check that the token is in our cache
        var cache = Cache.instance

        cache.get(request.payload.userid)
            .then((tokens) => {
                if ( ! tokens) {
                    reply({ status: 'Invalid token' }).code(401)
                    return
                }

                // make sure that the token in the payload exists in the cache and is valid
                var values = Object.keys(tokens).map(key => tokens[key])
                if (values.indexOf(request.payload.token) > -1) {
                    JWT.verify(request.payload.token, secret, (err, token) => {
                        if (err) {
                            reply({ status: 'Invalid token' })
                            return
                        }

                        reply({ status: 'Valid token' })
                    })
                }
                else {
                    reply({ status: 'Invalid token' })
                }
            })
    }
}

module.exports = internals