'use strict'

var Redis = require('redis')

var instance;

class Cache {
    constructor(opts) {
        var defaults = {
            host: '192.168.99.100',
            port: 6379,
            socket_keepalive: false
        }
        
        this.options = Object.assign(defaults, opts)
    }

    connect() {
        var cache = this
        
        var promise = new Promise((resolve, reject) => {
            var redis = Redis.createClient(cache.options)
            
            redis.on('ready', () => {
                cache.redis = redis
                Cache.instance = cache
                resolve(cache)
            })
            
            redis.on('error', (err) => {
                reject(err)
            })
            
        })
        
        return promise
    }

    get(key) {
        var cache = this
        
        var _get = (key, resolve, reject) => {
            cache.redis.get(key, (err, value) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(value)
                }
            })
        }
        
        var promise = new Promise((resolve, reject) => {
            cache.connect()
                .then(_get.bind(null, key, resolve, reject))
        })

        return promise
    }

    set(key, val) {
        var cache = this
        
        var promise = new Promise((resolve, reject) => {
            cache.redis.set(key, val, (e) => {
                resolve(cache)
            })
        })
        
        return promise
    }

    done() {
        this.redis.end()
    }
}

module.exports = Cache