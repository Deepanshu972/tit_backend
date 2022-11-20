const { Sequelize, DataTypes, Model } = require("sequelize");
const Attendance = require("./attendance");
const db = require("./../config/database");

// password, userID, activeness, role, lastLogin, createdBy, updatedBy
const Student = db.define("2026_ce_sem1_students", {
  collegeID: {
    type: DataTypes.STRING,
    field: "collegeID",
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    field: "name",
    allowNull: false
  },
  fatherName: {
    type: DataTypes.STRING,
    field: "fatherName",
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    field: "email",
  },
  contactNumber: {
    type: DataTypes.STRING,
    field: "contactNumber",
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    field: "isActive",
  },
  batch: {
    type: DataTypes.INTEGER,
    field: "batch",
  }
});

Student.hasOne(Attendance, { foreignKey: "collegeID" });

module.exports = Student;
