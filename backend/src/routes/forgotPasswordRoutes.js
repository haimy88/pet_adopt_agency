const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { isExistingUser } = require("../middleware/usersMiddleware");
const {
  encryptPassword,
  passwordsMatch,
} = require("../middleware/usersMiddleware");
const forgotPasswordController = require("../controllers/forgotPasswordController");

router.post("/get_link", isExistingUser, forgotPasswordController.sendEmail);

router.get("/reset/:id/:token", forgotPasswordController.resetPassword);

router.post(
  "/reset/:id/:token",
  passwordsMatch,
  encryptPassword,
  forgotPasswordController.newPassword
);

module.exports = router;
