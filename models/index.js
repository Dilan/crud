const config = require('../config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.postgres.uri, { omitNull: true });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.company  = require("./company.model.js")(sequelize, Sequelize);
db.employee = require("./employee.model.js")(sequelize, Sequelize);
db.user     = require("./user.model.js")(sequelize, Sequelize);


db.employee.belongsTo(db.company);

module.exports = db;
