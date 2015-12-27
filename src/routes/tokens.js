var Cache = require('../lib/cache')
var JWT = require('jsonwebtoken')
var users = require('../users.json')

var internals = {
    method: 'GET',
    path: '/',
    config: {
        auth: 'simple',
        handler: (request, reply) => {
            if ( ! request.auth.isAuthenticated) {
                reply({ error: String.denied }).code(400)
                return
            }

            // get all of the tokens for the userId
            var token = request.auth.credentials.token
            var cache = Cache.instance
            cache.get(token.userId)
                .then((res) => {
                    var output = []
                    for (var obj in res) {
                        output.push({ sessionId: obj, token: res[obj] })
                    }
                    
                    reply(output)
                })
        }
    }
}

module.exports = internals