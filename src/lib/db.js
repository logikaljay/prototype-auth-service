var Cassandra = require('cassandra-driver')
var instance

class Db {
    constructor(opts) {
        var defaults = {
            contactPoints: [ '192.168.99.100:32769' ]
        }
            
        this.options = Object.assign(defaults, opts)
    }

    connect(opts) {
        var promise = new Promise((resolve, reject) => {

            var client = new Cassandra.Client(this.options)
            client.connect((err, result) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(result)
                }
            })
        })

        return promise
    }

    get(key) {
        
    }
    
    set(key, val) {
        
    }
    
    done() {
        
    }
}

module.exports = Db