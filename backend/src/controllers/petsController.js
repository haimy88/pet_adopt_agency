const {
  ownPetsModel,
  returnPetsModel,
  savePetsModel,
  deleteSavedPetModel,
  getAllOwnedAndSavedPetsModel,
  approvePetOwnershipModel,
  getAllOwnershipsModel,
  getOwnershipDetailsModel,
} = require("../models/ownPetsModel");

const {
  searchPetsGeneralModel,
  searchPetsFilterModel,
  getIndividualPetDetailsModel,
} = require("../models/searchPetsModel");

const {
  deletePetModel,
  createPetModel,
  updatePetModel,
} = require("../models/createPetsModel");

const createPet = async (req, res) => {
  try {
    const new_pet = await createPetModel(req);
    res.json(new_pet)
    if (new_pet.error) {
      throw new Error(new_pet.error);
    }
    res.status(200).send("New pet created successfully");
  } catch (err) {
    res.status(400).send(err);
  }
};

const updatePet = async (req, res) => {
  try {
    const update = await updatePetModel(req);
    if (update.error) {
      throw new Error(update.err);
    }
    res.status(200).send("Pet updated successfully");
  } catch {
    res.status(400).send("Failed to update the pet");
  }
};

const searchPets = async (req, res) => {
  if (req.query.general) {
    try {
      const general_search = await searchPetsGeneralModel(req);
      if (general_search.error) {
        throw new Error(general_search.err);
      }
      res.status(200).send(general_search);
    } catch (err) {
      res.status(400).send("Error in the search");
    }
  } else {
    try {
      const filter_search = await searchPetsFilterModel(req);
      res.status(200).send(filter_search);
    } catch (err) {
      res.status(400).send("Error in the search");
    }
  }
};

const getIndividualPetDetails = async (req, res) => {
  try {
    const pet = await getIndividualPetDetailsModel(req);
    if (pet.error) {
      throw new Error(pet.err);
    }
    res.status(200).send(pet);
  } catch (err) {
    res.status(400).send("Error in getting pet details");
  }
};

const deletePet = async (req, res) => {
  try {
    const deleted = await deletePetModel(req);
    if (deleted.error) {
      throw new Error(deleted.err);
    }
    res.status(200).send("Pet deleted successfully");
  } catch (err) {
    res.status(400).send("Error in deleting this pet");
  }
};

const ownPet = async (req, res) => {
  try {
    const ownedPet = await ownPetsModel(req.body, req.params.id);
    if (ownedPet.error) {
      throw new Error(ownedPet.err);
    }
    res
      .status(200)
      .send(
        `Your request for ${ownedPet.type} has been submitted and will be reviewed by our staff :)`
      );
  } catch (err) {
    res.status(500).send(err);
  }
};

const returnPet = (req, res) => {
  try {
    const returned = returnPetsModel(req.params.id);
    if (returned.error) {
      throw new Error(returned.error);
    }
    res.status(200).send("This pet has been returned");
  } catch (err) {
    res.status(500).send(err);
  }
};

const savePet = (req, res) => {
  try {
    const saved = savePetsModel(req.params.id, req.body.userId);
    if (saved.error) {
      throw new Error(saved.err);
    }
    res.status(200).send("This Furiend has been saved ❤️ ");
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteSavedPet = (req, res) => {
  try {
    const deleted = deleteSavedPetModel(req.params.id, req.body.userId);
    if (deleted.error) {
      throw new Error(deleted.err);
    }
    res.status(200).send("This Furiend has been unsaved");
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllOwnedAndSavedPets = async (req, res) => {
  try {
    const saved_and_owned_pets = await getAllOwnedAndSavedPetsModel(
      req.params.id
    );
    if (saved_and_owned_pets.error) {
      throw new Error(saved_and_owned_pets.err);
    }
    res.status(200).send(saved_and_owned_pets);
  } catch (err) {
    res.status(500).send(err);
  }
};

const approvePetOwnership = async (req, res) => {
  try {
    const approval = await approvePetOwnershipModel(req.params.id, req.body);
    if (approval.error) {
      throw new Error(approval.err);
    }
    if (req.body.status === "Return Pending") {
      res
        .status(200)
        .send(
          "Thank you for taking care of this Furiend! Please bring it to one of our locations to confirm the return :)"
        );
    } else {
      res.status(200).send(`${approval.name} has been approved for ownership!`);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const getOwnershipDetails = async (req, res) => {
  try {
    const details = await getOwnershipDetailsModel(
      req.body.userId,
      req.params.id
    );
    if (details.error) {
      throw new Error(details.err);
    }
    res.status(200).send(details);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllOwnerships = async (req, res) => {
  try {
    const list_of_ownerships = await getAllOwnershipsModel();
    if (list_of_ownerships.error) {
      throw new Error(list_of_ownerships.err);
    }
    res.status(200).send(list_of_ownerships);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  ownPet,
  returnPet,
  savePet,
  deleteSavedPet,
  getAllOwnedAndSavedPets,
  approvePetOwnership,
  getOwnershipDetails,
  getAllOwnerships,
  searchPets,
  getIndividualPetDetails,
  deletePet,
  createPet,
  updatePet,
};
