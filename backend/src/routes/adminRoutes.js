const express = require("express");
const router = express.Router();
const PetsController = require("../controllers/petsController");
const { upload } = require("../config/uploadImage");
const { confirmAdmin } = require("../middleware/confirmAdmin");
const { validateToken } = require("../middleware/validateToken");

router.post(
  "/add",
  validateToken,
  confirmAdmin,
  upload.single("img"),
  PetsController.createPet
);

router.put(
  "/pet/:id",
  validateToken,
  confirmAdmin,
  upload.single("img"),
  PetsController.updatePet
);

module.exports = router;
