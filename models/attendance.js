const { Sequelize, DataTypes } = require("sequelize");
const db = require("./../config/database");

/*
 * TODO: find a way to create
 * multiple tables with this same model
 */
// collegeID, date, lectureNumber act as a composite key
const Attendance = db.define("2026_ce_sem1_attendance_maths",
  {
    id: {
      type: DataTypes.INTEGER,
      field: "id",
      primaryKey: true,
      autoIncrement: true
    },
    collegeID: {
      type: DataTypes.STRING,
      field: "collegeID",
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      field: "date",
      allowNull: false,
    },
    lectureNumber: {
      type: DataTypes.INTEGER,
      field: "lectureNumber",
      allowNull: false,
    },
    isPresent: {
      type: DataTypes.BOOLEAN,
      field: "isPresent",
    },
  }, {
    indexes: [{
      "name": "composite_key",
      fields: ["collegeID", "date", "lectureNumber"],
      unique: true,
    }]
  }
);

module.exports = Attendance;
