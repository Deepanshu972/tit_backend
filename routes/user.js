const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("./../models/user");
const validatePassword = require("./../middlewares/passwords");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const data = req.body;
  // check if username is taken
  const userExists = await User.findOne({where: {username: data.username}}) ? true : false;

  // check if password or username is blank
  const blankFields = data.password === "" || data.username === "";

  if (userExists) {
    res.status(409).json({"message": "Error: Username is taken."})
  } else if (blankFields) {
    res.status(401).json({"message": "Error: Username or password is empty"})
  } else {
    // generate password hash
    const hash = await bcrypt.hash(data.password, bcrypt.genSaltSync(8))
    const newUser = await User.create({...data, password: hash, verified: false});

    res.status(200).json({"message": `Created new user '${newUser.username}'`})
  }
});

router.delete("/", validatePassword, async (req, res) => {
  User.destroy({where: {username: req.body.username}})
    .then(_ => res.status(200).json({"message": "successfully deleted user"}))
    .catch(_ => res.status(500).json({"message": "internal server error (cannot login)"}))
})

router.put("/", validatePassword, async (req, res) => {
  const changes = req.body.changes;

  // hash the new password
  const hash = await bcrypt.hash(req.body.password, bcrypt.genSaltSync(8));
  changes.password = hash;

  User.update(changes, {where: {username: req.body.username}})
    .then(response => res.status(200).json({"message": "successfully modified user"}))
    .catch(err => {
      console.log(err);
      res.status(500).json({"message": "internal server error (cannot edit user)"})
    })
})

module.exports = router;
