var assert = require('assert');
var request = require('supertest');
const jwt = require('jsonwebtoken');
var User = require('../models').user;
var Company = require('../models').company;
var sinon = require('sinon');

var buildToken = (email) => {
    // Generate JWT token
     return jwt.sign({
        user: { id: 901, email: email },
    }, 'Some--Secr(*)t.');

}

describe('API company routes tests:', function() {
    var stubList;
    var sandbox;

    before(function(done) {
        // mock authentication
        sinon.stub(User, 'findOne').returns(Promise.resolve({ email: 'test@dilan.app' }))
        done()
    });

    after(function(done) {
        sinon.restore();
        done()
    });

    var app;
    beforeEach(function(done) {
        app = require('../server').app();
        done();
    });

    afterEach(function(done) {
        done();
    });

    it('Request to /api/companies return all companies', function(done) {

        companyFindAllStub = sinon.stub(Company, 'findAll').returns(Promise.resolve([
            { id: 1, name: 'Company-A' }, { id: 2, name: 'Company-B' }
        ]))

        request(app)
            .get('/api/companies')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + buildToken('test@dilan.app'))
            .end(function(err, res) {
                assert.equal(res.statusCode, 200);

                assert.equal(Array.isArray(res.body), true);
                assert.equal(res.body.length, 2);
                done();
            });
    });
});
