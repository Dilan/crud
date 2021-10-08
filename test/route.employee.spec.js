const assert = require('assert');
const request = require('supertest');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
var sinon = require('sinon');

const db = require('../models');

const md5 = (str) => {
    return crypto.createHash('md5').update(str).digest("hex").toString();
};


var buildToken = (email) => {
    return jwt.sign({   // Generate JWT token
        user: { id: 901, email: email },
    }, 'Some--Secr(*)t.');
}

describe('API employee routes tests:', function() {

    before(function(done) {

        Promise.all([
            db.user.sync({ force: true }),
            db.company.sync({ force: true }),
            db.employee.sync({ force: true })
        ])
        .then(() => {
            return Promise.all([
                db.user.create({
                    email: 'test@dilan.app', md5password: md5('qwerty')
                }),
                db.employee.create({
                    firstname: 'Dilan', lastname: 'J.', email: 'admin@dilan.app'
                }),
                db.employee.create({
                    firstname: 'John', lastname: 'Snow', email: 'jogn.snow@winterfell.castle'
                }),
            ])
        }).then(function() {
            done();
        })
        .catch(err => {
            done(err);
        });
    });

    after(function(done) {
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

    it('Request to /api/employees return employee list from DataBase', function(done) {

        request(app)
            .get('/api/employees')
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
