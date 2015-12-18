var Hapi = require('hapi')
var Router = require('hapi-router')
var Good = require('good')
var GoodConsole = require('good-console')
var Cache = require('./lib/cache')

var instance = {
    port: 8080,
    
    plugins: [
        {
            register: Good,
            options: {
                reporters: [{
                    reporter: GoodConsole,
                    events: { log: '*', response: '*' }
                }]
            }
        },
        {
            register: Router,
            options: {
                routes: './src/routes/*.js'
            }
        }
    ],
    
    init: () => {
        var server = new Hapi.Server()
        server.connection({ port: instance.port })
        
        server.register(instance.plugins, (err) => {
            if (err) {
                console.log('Failed to load plugin: %s', err)
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
    },
    
    cleanup: (opts) => {
        instance.cache.redis.end()
        process.exit()
    }
}

// setup the cache before listening for connections
var cache = new Cache()
cache.connect()
    .then(instance.init.bind(null))
    .catch((ex) => console.log(ex.stack))

module.exports = instance
