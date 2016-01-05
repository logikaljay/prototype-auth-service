var Cache = require('../lib/cache')
var JWT = require('jsonwebtoken')

var secret = "TOPSECRET"

var internals = {
    method: 'GET',
    path: '/secure',
    config: {
        auth: 'simple',
        handler: (request, reply) => {
            reply({ status: 'Valid token' })
        }
    }
}

module.exports = internals