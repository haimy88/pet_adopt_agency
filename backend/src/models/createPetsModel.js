const { Pet } = require("../data/querySchemas");
const cloudinary = require("../config/cloudinary");

async function deletePetModel(req) {
  try {
    let pet = await Pet.find({ _id: req.params.id })
    await cloudinary.uploader.destroy(pet[0].cloudinary_id);
    console.log(pet[0].cloudinary_id);
    await pet[0].remove().exec()
  } catch (err) {
    return { error: err };
  }
}

async function createPetModel(req) {
  try {
    const result = await cloudinary.uploader.upload(req.file.path)
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
      img: result.secure_url,
      cloudinary_id: result.public_id,
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
    const result = await cloudinary.uploader.upload(req.file.path)
    update.img = result.secure_url;
  }
  try {
    await Pet.findByIdAndUpdate({ _id: req.params.id }, update);
    return true;
  } catch (err) {
    return { error: err };
  }
}

module.exports = { deletePetModel, createPetModel, updatePetModel };
