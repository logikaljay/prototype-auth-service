var Lab = require('lab')
var Code = require('code')
var expect = Code.expect
var lab = exports.lab = Lab.script()
var server = require('../')

lab.experiment('Logout', () => {
    server.debug = false
    
    lab.test('DELETE should log a user out with the correct token', (done) => {
        // get a token
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
            options.method = 'DELETE'
            options.payload = undefined;
            options.headers = {
                Authorization: 'Bearer ' + token
            }

            server.inject(options, (response) => {
                var logoutResult = response.result
                
                expect(response.statusCode).to.equal(200)
                expect(logoutResult).to.include('status')
                
                done()
            })
        })
    })
})