// load .env file
require("dotenv").config({path: `.env`});

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');

const errResponse = require("./middlewares/errors");
const userRouter = require("./routes/user");
const attendanceRouter = require("./routes/attendance");
const studentRouter = require("./routes/student");
const loginRouter = require("./routes/auth");
const home = require("./routes/home");
const db = require("./config/database");

// temporary imports just to fill the DB
const filter = require("./models/filter");
const student = require("./models/student");
const attendance = require("./models/attendance");

const port = process.env.PORT || "5000";
const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cookieParser());

// use routers
app.use("/user", userRouter);
app.use("/attendance", attendanceRouter)
app.use("/student", studentRouter)
app.use("/", loginRouter);
app.use("/", home);

// middleware to send error message as JSON API response
app.use(errResponse);

// test database connection
db.authenticate()
  .then(() => {
    console.log(`Connected to Database ${process.env.dbName}. Syncing Database...`);
    db.sync({ force: true }) // force: true drops all tables on startup
      .then(_ => {
        // add sample data to DB
        student.create({
          collegeID: "22CE001",
          name: "a",
          fatherName: "A",
          batch: 2026
        })
        student.create({
          collegeID: "22CE002",
          name: "b",
          fatherName: "B",
          batch: 2026
        })
        student.create({
          collegeID: "22CE003",
          name: "c",
          fatherName: "C",
          batch: 2026
        })

        filter.create({
          schemeName: "G",
          batch: 2026,
          semester: 1,
          department: "CE",
          subjectName: "Maths 1",
          attendanceTable: "2026_ce_sem1_attendance_maths",
          studentTable: "2026_ce_students_maths"
        });

      })
  })
  .catch(err => console.log("Error connecting to the database:", err)); 

app.listen(port);
