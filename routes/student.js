const router = require("express").Router();
const Filter = require("../models/filter");
const Student = require("../models/student");
const db = require("../config/database");

// middleware to verify JWT
router.use(require("../middlewares/authenticate-token"));

/* request body should contain
 * scheme, batch, department, semester and subject
 * to return a table of students from
 */
router.get("/", async (req, res) => {
  try {
    const table = await Filter.findOne({where: req.body.filter})
    if (table) {
      const studentTable = table.dataValues.studentTable;
      console.log("Table:", studentTable);

      const data = await Student.findAll();
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

module.exports = router;
