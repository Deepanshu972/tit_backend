const { Sequelize, DataTypes } = require("sequelize");
const db = require("./../config/database");

const User = db.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    field: "username",
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    field: "password",
    allowNull: false
  },
  role: {
    type: DataTypes.INTEGER,
    field: "role",
  },
  lastLogin: {
    type: DataTypes.DATE,
    field: "lastLogin",
  },
  createdBy: {
    type: DataTypes.DATE,
    field: "createdBy",
  },
  updatedBy: {
    type: DataTypes.DATE,
    field: "updatedBy",
  }
});

module.exports = User;
