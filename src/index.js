var Hapi = require('hapi')
var Router = require('hapi-router')
var Good = require('good')
var GoodConsole = require('good-console')
var Cache = require('./lib/cache')
var AuthBearerToken = require('hapi-auth-bearer-token')
var Strategy = require('./lib/strategy')

var instance = {
    port: 8080,
    
    plugins: [
        {
            register: AuthBearerToken
        }
    ],
    
    init: () => {
        // add logging if NODE_ENV is not test
        if (process.env.NODE_ENV !== 'test') {
            instance.plugins.push({
                register: Good,
                options: {
                    reporters: [{
                        reporter: GoodConsole,
                        events: { log: '*', response: '*' }
                    }]
                }
            })
        }
        
        var server = new Hapi.Server()
        server.connection({ port: instance.port })
        
        server.register(instance.plugins, (err) => {
            if (err) {
                console.log('Failed to load plugin: %s', err)
            }
            
            server.auth.strategy('simple', 'bearer-access-token', Strategy)
        })
        
        server.register({
            register: Router,
            options: { routes: './src/routes/*.js' }
        },
        (err) => {
            if (err) {
                console.log('Failed to register routes: %s', err)
            }
        })
        
        server.start((err) => {
            if (err) {
                console.log('HAPI Error: %s', err)
            }
            else {
                console.log("Hapi listening on %s", server.info.uri)
            }
        })
        
        return server
    },
    
    cleanup: (opts) => {
        instance.cache.redis.end()
        process.exit()
    }
}

// setup hapi
var server = instance.init()

// setup the cache
var cache = new Cache()
cache.connect()
    .catch((ex) => console.log(ex.stack))

module.exports = server
