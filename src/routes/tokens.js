var Cache = require('../lib/cache')
var JWT = require('jsonwebtoken')
var users = require('../users.json')

var internals = {
    method: 'GET',
    path: '/',
    config: {
        auth: 'simple',
        handler: (request, reply) => {
            // get all of the tokens for the userId
            var token = request.auth.credentials.token
            var cache = Cache.instance
            cache.get('tokens:' + token.userId)
                .then((res) => {
                    reply(res)
                })
        }
    }
}

module.exports = internals

