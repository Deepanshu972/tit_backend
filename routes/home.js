const router = require("express").Router();
const authenticateToken = require("../middlewares/authenticate-token");
const User = require("../models/user");

router.get("/home", authenticateToken, async (req, res) => {
  const {dataValues} = await User.findOne({where: {username: req.user.username}});
  res.json({"username": dataValues.username, "verified": dataValues.verified});
})

module.exports = router;
