var Cache = require('../lib/cache')
var JWT = require('jsonwebtoken')
var uuid = require('node-uuid')
var crypto = require('crypto')
var users = require('../users.json')

var internals = {
    method: 'DELETE',
    path: '/',
    config: {
        auth: 'simple',
        handler: (request, reply) => {
            // revoke this token from the whitelist
            var token = request.auth.credentials.token
            var cache = Cache.instance
            cache.del(token.userId, token.sessionId)
                .then(() => {
                    reply({ status: String.removed }).code(200)
                })
                .catch((e) => {
                    reply({ error: e }).code(400)
                })
        }
    }
}

module.exports = internals