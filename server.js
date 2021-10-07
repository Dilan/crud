const express = require('express');
const cors = require('cors');
const pretty = require('express-prettify');
const Sequelize = require('sequelize');

// passport
const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const db = require("./models");
const config = require('./config');

const application = function() {
    var app = express();

    app.set('trust proxy', 'loopback');

    // middleware
    var bodyParser = require('body-parser');
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(pretty({ query: 'pretty' }));
    app.use(cors());
    app.use(express.json());

    app.use(function(req, res, next) { // logging every HTTP request

        var ipAddress = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            (req.connection.socket ? req.connection.socket.remoteAddress : null);

        console.log(
            ipAddress,
            '->',
            req.method,
            decodeURIComponent(req.url),
            (req.method !== 'GET' ? JSON.stringify(req.body, null, 0) : '')
        );
        next();
    });

    // Configure JWT strategy for use by Passport
    passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey   : 'Some--Secr(*)t.'
        },
        function (jwtPayload, done) {     // header { Authorization: "bearer <token>" }

            var email = jwtPayload.user.email;
            return db.user.findOne({ where: { email} }).then(user => {
                done(null, user);
            })
            .catch(err => {
                return done(err);
            });
        }
    ));

    const isAuthenticated = function(route) {
        return function(req, res, next) {
            passport.authenticate('jwt', { session: false }, function(err, user, info) {

                // 401 - None authenticated
                if (!user) {
                    console.log(`None authenticated request.`);
                    return res.status(401).json({});
                }

                console.log(`Authenticated as ${user.email}`);
                req.user = user;
                route(req, res, next);
            })(req,res,next);
        };
    }

    app.use(passport.initialize());

    app.get('/', function(req, res) { res.json({ status: 'success' }); });
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/companies', isAuthenticated(require('./routes/companies')));
    app.use('/api/employees',  isAuthenticated(require('./routes/employees')));

    function errorHandler (err, req, res, next) {
        if (res.headersSent) {
            return next(err);
        }
        return res.status(500).json({ error: 'Unexpected error.' });
    }
    app.use(errorHandler);

    return app;
}

// CLI: start server
if (require.main === module) {

    // 1. connect to DataBase
    const sequelize = new Sequelize(config.postgres.uri);
    sequelize.authenticate()
        .then(() => {
            console.log('Postgres connection has been established successfully.');
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        })

    // 2. run HTTP server
    var app = application();
    require('http').createServer(app)
        .on('listening', function() {
            console.log('Express server listening on port:', config.app.port);
        })
        .on('error', function(err) {
            console.error(err);
        })
        .listen(config.app.port);

    process.on('uncaughtException', function (err) {
        console.error(err);
        process.exit(1);
    });
    process.on('unhandledRejection', (reason, p) => {
      console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
      process.exit(1);
    });
}

module.exports.app = application;
