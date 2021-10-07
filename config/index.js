var path = require('path');
var convict = require('convict');
var rootPath = path.resolve(path.join(__dirname, '..'));

var config = convict({
    env: {
        doc: 'API Immersive VR',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV'
    },
    app: {
        ip: {
            default: '127.0.0.1',
            env: 'IP_ADDRESS'
        },
        port: {
            default: 3000,
            env: 'PORT'
        }
    },
    postgres: {
        host: '127.0.0.1',
        database: 'immersive',
        user: 'postgres',
        password: 'postgres',
        port: '5432',
        schema: 'vr',
        uri: ''
    }
});

// Load environment dependent configuration
config.loadFile('./config/' + config.get('env') + '.json');

config.set(
    'postgres.uri',
    'postgres://' + config.get('postgres.user') + ':' + config.get('postgres.password') +
                    '@' + config.get('postgres.host') + ':' + config.get('postgres.port') +
                    '/' + config.get('postgres.database')
);

// Perform validation
config.validate();

module.exports = config.getProperties();
