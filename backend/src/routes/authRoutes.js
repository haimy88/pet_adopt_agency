const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/usersController");
const { validateBody } = require("../middleware/validateBody");
const { validateEmail } = require("../middleware/validateEmail");
const { signUpSchema, loginSchema } = require("../data/schemas");
const {
  isNewUser,
  passwordsMatch,
  encryptPassword,
  isExistingUser,
} = require("../middleware/usersMiddleware");

router.post(
  "/signup",
  validateBody(signUpSchema),
  validateEmail,
  isNewUser,
  passwordsMatch,
  encryptPassword,
  UsersController.signup
);

router.post(
  "/login",
  validateBody(loginSchema),
  isExistingUser,
  UsersController.login
);

module.exports = router;
