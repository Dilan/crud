const config = require('../config');

module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define("company", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING
        },
        address: {
          type: Sequelize.STRING
        },
        phone: {
          type: Sequelize.STRING
        },
        website: {
          type: Sequelize.STRING
        }
      },
      {
          underscored: true,
          schema: config.postgres.schema,
      }
  );

  return Company;
};
