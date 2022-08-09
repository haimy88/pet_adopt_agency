const { getUserByEmail } = require("../models/usersModel");
const bcrypt = require("bcrypt");

async function isNewUser(req, res, next) {
  const user = await getUserByEmail(req.body.email);
  if (user.length !== 0) {
    res.status(400).send("User Already Exists");
    return;
  }
  next();
}

function passwordsMatch(req, res, next) {
  if (req.body.password !== req.body.repassword) {
    res.status(400).send("Passwords don't match");
    return;
  }
  next();
}

function encryptPassword(req, res, next) {
  const saltRounds = 10;
  if (req.body.password) {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      req.body.password = hash;
      next();
    });
  } else {
    next();
  }
}

async function isExistingUser(req, res, next) {
  const user = await getUserByEmail(req.body.email);
  if (user.length === 0) {
    res.status(400).send("User with this email does not exist");
    return;
  }
  req.body.user = user[0];
  next();
}

module.exports = {
  isNewUser,
  passwordsMatch,
  encryptPassword,
  encryptPassword,
  isExistingUser,
};
