const { Pet } = require("../data/querySchemas");

async function deletePetModel(req) {
  try {
    Pet.find({ _id: req.params.id }).remove().exec();
  } catch (err) {
    return { error: err };
  }
}

async function createPetModel(req) {
  try {
    const pet = new Pet({
      name: req.body.name,
      type: req.body.type,
      breed: req.body.breed,
      height: req.body.height,
      weight: req.body.weight,
      color: req.body.color,
      dietary_restrictions: req.body.dietary_restrictions,
      bio: req.body.bio,
      hyperallergenic: req.body.hyperallergenic,
      status: req.body.status,
      img: req.file.filename,
    });
    pet.save();
    return true;
  } catch (err) {
    return { error: err };
  }
}

async function updatePetModel(req) {
  let update = {
    name: req.body.name,
    type: req.body.type,
    breed: req.body.breed,
    height: req.body.height,
    weight: req.body.weight,
    color: req.body.color,
    dietary_restrictions: req.body.dietary_restrictions,
    bio: req.body.bio,
    color: req.body.hyperallergenic,
    status: req.body.status,
  };
  if (req.body.img) {
    update.img = req.body.img;
  }
  console.log(update);
  try {
    await Pet.findByIdAndUpdate({ _id: req.params.id }, update);
    return true;
  } catch (err) {
    return { error: err };
  }
}

module.exports = { deletePetModel, createPetModel, updatePetModel };
