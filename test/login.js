var Lab = require('lab')
var Code = require('code')
var expect = Code.expect
var lab = exports.lab = Lab.script()
var server = require('../')

lab.experiment('Login', () => {
    server.debug = false
    
    lab.test('POST should log a user in with the correct credentials', (done) => {
        var options = {
            method: 'POST',
            url: '/',
            payload: {
                userName: 'jay.baker@touchcast.co.nz',
                password: 'password1'
            }
        }
        
        server.inject(options, (response) => {
            var result = response.result
            
            expect(response.statusCode).to.equal(200)
            expect(result).to.be.instanceOf(Object)
            expect(result).to.have.length(2)
            done()
        })
    })
    
    lab.test('POST should not log a user in with incorrect credentials', (done) => {
        var options = {
            method: 'POST',
            url: '/',
            payload: {
                userName: 'jay.baker@touchcast.co.nz',
                password: 'not-the-right-password'
            }
        }
        
        server.inject(options, (response) => {
            var result = response.result
            
            expect(response.statusCode).to.equal(401)
            expect(result).to.be.instanceOf(Object)
            expect(result).to.have.include('error')
            done()
        })
    })
})
