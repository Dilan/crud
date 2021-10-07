const config = require('../config');

module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            firstname: {
                type: Sequelize.STRING,
                allowNull: false
            },
            lastname: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING
            },
            phone: {
                type: Sequelize.STRING
            }
        },
        {
            underscored: true,
            schema: config.postgres.schema,
        }
    );

    return Employee;
};
