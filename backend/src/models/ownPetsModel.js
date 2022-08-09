const { User, Ownership, Pet, SavedPet } = require("../data/querySchemas");

async function ownPetsModel(ownership, id) {
  try {
    let pet = await Pet.find({ _id: id });
    let user = await User.find({ _id: ownership.userId });
    const new_ownership = new Ownership({
      userId: ownership.userId,
      userFirstName: user[0].firstName,
      petId: id,
      petName: pet[0].name,
      type: ownership.type,
      status: "Pending Approval",
      startDate: ownership.startDate,
      endDate: ownership.endDate,
    });
    console.log(new_ownership);
    await new_ownership.save();
    return new_ownership;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
}

async function approvePetOwnershipModel(id, req) {
  try {
    const ownership = await Ownership.findOneAndUpdate(
      { petId: id },
      { status: req.status }
    );
    let pet = {};
    if (req.status === "Approved") {
      pet = Pet.findById(id, (err, pet) => {
        if (err) {
          console.log(err);
        } else {
          console.log(ownership.type);
          ownership.type === "Adoption"
            ? (pet.status = "Adopted")
            : (pet.status = "Fostered");
          pet.save();
        }
      });
    }
    if (req.status === "Returned") {
      pet = Pet.findById(id, (err, pet) => {
        if (err) {
          console.log(err);
        } else {
          console.log(ownership.type);
          pet.status = "Available";
          pet.save();
        }
      });
    }
    return ownership;
  } catch (err) {
    return { error: err };
  }
}

async function getOwnershipDetailsModel(userId, petId) {
  try {
    const details = await Ownership.find({ userId: userId, petId: petId });
    return details;
  } catch (err) {
    return { error: err };
  }
}

async function returnPetsModel(id) {
  try {
    await Ownership.deleteOne({ petId: id });
    Pet.findById(id, (err, pet) => {
      if (err) {
        console.log(err);
      } else {
        pet.status = "Available";
        pet.save();
      }
    });
  } catch (err) {
    return { error: err };
  }
}

async function savePetsModel(petId, userId) {
  try {
    const new_saved_pet = new SavedPet({
      petId: petId,
      userId: userId,
    });
    await new_saved_pet.save();
    return new_saved_pet;
  } catch (err) {
    return { error: err };
  }
}

async function deleteSavedPetModel(pet, user) {
  try {
    await SavedPet.deleteOne({ petId: pet, userId: user });
  } catch (err) {
    return { error: err };
  }
}

async function getAllOwnedAndSavedPetsModel(userId) {
  try {
    const owned_pets_list = (await Ownership.find({ userId: userId })).map(
      (ownership) => ownership.petId
    );
    const saved_pets_list = (await SavedPet.find({ userId: userId })).map(
      (ownership) => ownership.petId
    );
    const owned_pets = await Pet.find({ _id: { $in: owned_pets_list } }).exec();
    const saved_pets = await Pet.find({ _id: { $in: saved_pets_list } }).exec();
    const all_pets = {
      saved: saved_pets,
      owned: owned_pets,
    };
    return all_pets;
  } catch (err) {
    return { error: err };
  }
}

async function getAllOwnershipsModel() {
  try {
    const ownerships = await Ownership.find();
    return ownerships;
  } catch (err) {
    return { error: err };
  }
}

async function getUserRequestsModel(id) {
  try {
    const requests = await Ownership.find({ userId: id });
    return requests;
  } catch (err) {
    return { error: err };
  }
}

module.exports = {
  ownPetsModel,
  returnPetsModel,
  savePetsModel,
  deleteSavedPetModel,
  getAllOwnedAndSavedPetsModel,
  approvePetOwnershipModel,
  getOwnershipDetailsModel,
  getAllOwnershipsModel,
  getUserRequestsModel,
};
