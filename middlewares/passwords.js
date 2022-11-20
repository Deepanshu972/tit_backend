const User = require("../models/user");
const bcrypt = require("bcrypt");

/* middleware to check heck if user
 * exists and password is correct
 */
const checkPassword = async (req, res, next) => {
  // check if either username or password is empty
  const blankFields = req.body.password === "" || req.body.username.trim() === "";
  if (blankFields) {
    const err = new Error("username or password is empty");
    err.status = 401;
    next(err);
  }

  try {
    const user = await User.findOne({where: {username: req.body.username}});

    if (user) {
      const isValidPass = await bcrypt.compare(req.body.password, user.dataValues.password);
      // if password is correct
      if (isValidPass) {
        req.user = user;
        next();
      } else {
        const err = new Error("password is incorrect");
        err.status = 401;
        next(err);
      }
    } else {
      const err = new Error(`no user '${req.body.username}' found.`);
      err.status = 404;
      next(err);
    }
  } catch(err) {next(err)}
}

module.exports = checkPassword;
