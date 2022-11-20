// contains routes related to logging in/out, etc
const checkPassword = require("../middlewares/passwords");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const generateAccessToken = (id) =>
  jwt.sign({"id": id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15s"});

const generateJWT = (id) => [
  generateAccessToken(id),
  jwt.sign({"id": id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "3m"})
];

// check password and give access and refresh token
router.post("/login", checkPassword, (req, res) => {
  const [accessToken, refreshToken] = generateJWT(req.user.id);

  req.user.update({"lastLogin": new Date()})
    .then(r => {
      res.cookie(
        "refreshToken", refreshToken, {httpOnly: true/*, secure: true*/}
      ).json({"accessToken": accessToken, "user": r.dataValues});
    })
    .catch(err => {
      console.error("/login: Error while updating user's lastLogin:", err);
      res.status(500).json({"error": "Internal Server Error 500"});
    });
});

// get new access token
router.post("/refreshtoken", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({"message": "session expired"})
      res.status(200).json({"accessToken": generateAccessToken(user.id)})
    })
  } else {
    res.status(401).json({"message": "null token"})
  }
})

module.exports = router;
