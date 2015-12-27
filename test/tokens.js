var Lab = require('lab')
var Code = require('code')
var expect = Code.expect
var lab = exports.lab = Lab.script()
var server = require('../')

lab.experiment('Tokens', () => {
    server.debug = false
    
    lab.test('GET should with valid token should return array of tokens', (done) => {
        // get a valid token
        var options = {
            method: 'POST',
            url: '/',
            payload: {
                userName: 'jay.baker@touchcast.co.nz',
                password: 'password1'
            }
        }
        
        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(200)
            var token = response.result.token
            options.method = 'GET'
            options.payload = undefined
            options.headers = {
                Authorization: 'Bearer ' + token
            }
            
            server.inject(options, (response) => {
                var result = response.result
                
                expect(response.statusCode).to.equal(200)
                expect(result).to.be.instanceOf(Object)
                expect(result.length).to.be.above(1)
                done()
            })
        })
    })
})