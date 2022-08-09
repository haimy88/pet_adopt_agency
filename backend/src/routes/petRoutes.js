const express = require("express");
const router = express.Router();
const PetsController = require("../controllers/petsController");
const { validateBody } = require("../middleware/validateBody");
const { validateToken } = require("../middleware/validateToken");
const { ownPetSchema, savePetSchema } = require("../data/schemas");
const { confirmAdmin } = require("../middleware/confirmAdmin");
const {
  checkUniqueSaved,
  checkUniqueOwnership,
} = require("../middleware/checkUnique");
const { upload } = require("../config/uploadImage");

router.get(
  "/adopt",
  validateToken,
  confirmAdmin,
  PetsController.getAllOwnerships
);

router.get("/search", PetsController.searchPets);

router.get("/:id", PetsController.getIndividualPetDetails);

router.get("/:id/adopt", validateToken, PetsController.getOwnershipDetails);

router.get("/user/:id", validateToken, PetsController.getAllOwnedAndSavedPets);

router.post(
  "/:id/adopt",
  validateToken,
  checkUniqueOwnership,

  PetsController.ownPet
);

router.post("/:id/return", validateToken, PetsController.returnPet);

router.post(
  "/:id/save",
  validateToken,
  checkUniqueSaved,

  PetsController.savePet
);

router.put("/:id/adopt", validateToken, PetsController.approvePetOwnership);

router.delete("/:id", PetsController.deletePet);

router.delete("/:id/save", validateToken, PetsController.deleteSavedPet);

module.exports = router;
