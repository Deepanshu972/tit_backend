const { Sequelize, DataTypes } = require("sequelize");
const db = require("./../config/database");

const Session = db.define("sessions", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  token: {
    type: DataTypes.STRING,
    field: "token"
  },
});

module.exports = Session;
