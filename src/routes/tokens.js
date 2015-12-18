var Cache = require('../lib/cache')

var internals = {
    method: 'POST',
    path: '/',
    handler: (request, reply) => {
        // validate the request
        try {
            var obj = JSON.parse(request.body)
        }
        catch (ex) {
            reply({ error: 'Access denied' }).code(400)
        }
        
        var cache = Cache.instance
    }
}

module.exports = internals