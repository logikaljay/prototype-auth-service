var Lab = require('lab')
var Code = require('code')
var expect = Code.expect
var lab = exports.lab = Lab.script()
var server = require('../')

lab.experiment('Secure', () => {
    server.debug = false
    
    lab.test('GET on /secure should return valid with a valid token', (done) => {
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
            options.url = '/secure'
            options.method = 'GET'
            options.payload = undefined
            options.headers = {
                Authorization: 'Bearer ' + token
            }
            
            server.inject(options, (response) => {
                var result = response.result
                
                expect(response.statusCode).to.equal(200)
                expect(result).to.be.instanceOf(Object)
                expect(result).to.include('result')
                done()
            })
        })
    })
    
    lab.test('GET on /secure should return bad token with a invalid token', (done) => {
        var options = {
            method: 'GET',
            url: '/secure',
            headers: {
                Authorization: 'Bearer invalid-token'
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
