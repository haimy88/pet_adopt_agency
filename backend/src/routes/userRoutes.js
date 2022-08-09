const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/usersController");
const { validateToken } = require("../middleware/validateToken");
const { confirmAdmin } = require("../middleware/confirmAdmin");
const { encryptPassword } = require("../middleware/usersMiddleware");

router.get("/", validateToken, confirmAdmin, UsersController.getAllUsers);

router.get("/:id", validateToken, confirmAdmin, UsersController.getUserById);

router.put("/:id", validateToken, encryptPassword, UsersController.updateUser);

router.get(
  "/:id/full",
  validateToken,
  confirmAdmin,
  UsersController.getFullUserInfo
);

router.get("/:id/requests", validateToken, UsersController.getUserRequests);

module.exports = router;
