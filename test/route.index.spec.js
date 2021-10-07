var assert = require('assert');
var request = require('supertest');
var sinon = require('sinon');

describe('API routes tests:', function() {

    var app;
    beforeEach(function(done) {
        app = require('../server').app();
        done();
    });

    afterEach(function(done) {
        done();
    });

    it('Request to / return 200 response', function(done) {
        request(app)
            .get('/')
            .end(function(err, res) {
                assert.equal(res.statusCode, 200);
                assert.equal(res.body.status, 'success');
                done();
            });
    });

});
