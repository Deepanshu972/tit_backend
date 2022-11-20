const { Sequelize, DataTypes } = require("sequelize");
const db = require("./../config/database");

const Filter = db.define("filter", {
  id: {
    type: DataTypes.INTEGER,
    field: "id",
    primaryKey: true,
    autoIncrement: true
  },
  schemeName: {
    type: DataTypes.STRING,
    field: "schemeName",
    allowNull: false
  },
  batch: {
    type: DataTypes.INTEGER,
    field: "batch",
    allowNull: false
  },
  semester: { // TODO: should be ENUM
    type: DataTypes.INTEGER,
    field: "semester",
    allowNull: false
  },
  department: { //TODO: probably should be ENUM
    type: DataTypes.STRING,
    field: "department",
    allowNull: false
  },
  subjectName: {
    type: DataTypes.STRING,
    field: "subject",
    allowNull: false
  },
  studentTable: {
    type: DataTypes.STRING,
    field: "studentTable",
    allowNull: false
  },
  attendanceTable: {
    type: DataTypes.STRING,
    field: "attendanceTable",
    allowNull: false
  }
});

module.exports = Filter;
