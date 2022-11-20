const jwt = require("jsonwebtoken");

// verifies JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["x-access-token"];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({"message": "session expired"})
      req.user = user;
      next();
    });
  } else {
    const err = new Error("null token");
    err.status = 401;
    next(err);
  }
}

module.exports = authenticateToken;
