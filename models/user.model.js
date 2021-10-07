const config = require('../config');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING
        },
        md5password: {
            type: Sequelize.STRING
        }
    },
    {
        underscored: true,
        schema: config.postgres.schema,
    });

    return User;
};
