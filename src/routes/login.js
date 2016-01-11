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
        
        var cache = Cache.instance
        
        var getSessionId = ((cache) => {
            return new Promise((resolve, reject) => {
                // check if there is already a sessionId issued for this userId and use the sessionId when generating a new token
                cache.get('session:' + user.userId)
                    .then((tokens) => {
                        if (tokens && tokens[0] !== null) {
                            resolve(Object.keys(tokens)[0])
                        }
                        else {
                            var sessionId = uuid.v4().split('-').join('')
                            cache.set('session:' + user.userId, sessionId)
                            resolve(sessionId)
                        }
                    })
            })
        })
        
        var generateToken = ((sessionId) => {
            return new Promise((resolve, reject) => {
                // generate a token from the result of the third party
                var token = JWT.sign({ userName: user.userName, userId: user.userId, sessionId }, secret) 
                var cache = Cache.instance

                // whitelist this token in redis
                cache.add('tokens:' + user.userId, token)
                
                resolve(token)
            })
        })
        
        var replyWithToken = ((token) => {
            new Promise((resolve, reject) => {
                reply({ userId: user.userId, token })
                resolve()
            })
        })
        
        if ( ! cache) {
                cache = new Cache()
                cache.connect()
                    .then(getSessionId)
                    .then((sessionId) => generateToken(sessionId))
                    .then((token) => replyWithToken(token))
        }
        else {
            getSessionId(cache)
                .then((sessionId) => generateToken(sessionId))
                .then((token) => replyWithToken(token))
        }
    }
}

module.exports = internals