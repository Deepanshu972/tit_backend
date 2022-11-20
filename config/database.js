const Sequelize = require("sequelize");

const db = new Sequelize(process.env.dbName, process.env.dbUser, process.env.dbPass, {
  host: process.env.dbHost,
  dialect: process.env.dbType,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = db;
