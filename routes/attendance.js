const router = require("express").Router();
const Filter = require("../models/filter");
const Attendance = require("../models/attendance");
const db = require("../config/database");

// middleware to verify JWT
router.use(require("../middlewares/authenticate-token"));

/* request body should contain
 * scheme, batch, department, semester and subject
 * to return a table of students from
 */
router.get("/", async (req, res) => {
  try {
    const filter = await Filter.findOne({where: req.body.filter})
    if (filter) {
      const attendanceTable = filter.dataValues.attendanceTable;
      console.log("Table:", attendanceTable);

      const data = await Attendance.findAll();
      if (data) {
        res.status(200).json({"students": data});
      } else {
        res.status(500).json({"error": "Internal Server Error 500"});
      }
    } else {
      res.status(404).json({"error": "no data found with provided filter"});
    }
  } catch(err) {
    console.error(err);
    res.status(500).json({"error": "Internal Server Error 500"});
  }
});

router.post("/", async (req, res) => {
  try {
    const filter = await Filter.findOne({where: req.body.filter});
    if (filter) {
      const attendanceTable = filter.dataValues.attendanceTable;
      console.log("Table:", attendanceTable);

      // upserts multiple students' attendance
      Attendance.bulkCreate(req.body.attendance, {updateOnDuplicate: ["isPresent"]})
        .then(_ => {
          res.status(200).json({"message": "success"});
        })
        .catch(err => {
          console.error("Error while setting attendance in " + attendanceTable + ":", err)
          res.status(500).json({"error": "Internal Server Error 500"});
        });
    } else {
      res.status(404).json({"error": "no data found with provided filter"});
    }
  } catch(err) {
    console.error(err);
    res.status(500).json({"error": "Internal Server Error 500"});
  }
});

module.exports = router;
