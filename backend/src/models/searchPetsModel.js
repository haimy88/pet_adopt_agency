const { Pet } = require("../data/querySchemas");

async function searchPetsGeneralModel(req) {
  try {
    result = await Pet.find({
      $or: [
        { type: new RegExp(`^${req.query.general}$`, "i") },
        { name: new RegExp(`^${req.query.general}$`, "i") },
        { breed: new RegExp(`^${req.query.general}$`, "i") },
        { status: new RegExp(`^${req.query.general}$`, "i") },
        { dietary_restrictions: new RegExp(`^${req.query.general}$`, "i") },
      ],
    });
    return result;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
}

async function searchPetsFilterModel(req) {
  let query = {};
  if (req.query.name) {
    query.name = new RegExp(`^${req.query.name}$`, "i");
  }
  if (req.query.status) {
    query.status = new RegExp(`^${req.query.status}$`, "i");
  }
  if (req.query.breed) {
    query.breed = new RegExp(`^${req.query.breed}$`, "i");
  }
  if (req.query.type) {
    query.type = new RegExp(`^${req.query.type}$`, "i");
  }
  if (req.query.minHeight) {
    query.height = { $gt: req.query.minHeight };
  }
  if (req.query.maxHeight) {
    query.height = { $lt: req.query.maxHeight };
  }
  if (req.query.maxHeight && req.query.minHeight) {
    query.height = { $gt: req.query.minHeight, $lt: req.query.maxHeight };
  }
  if (req.query.minWeight) {
    query.weight = { $gt: req.query.minWeight };
  }
  if (req.query.maxWeight) {
    query.weight = { $lt: req.query.maxWeight };
  }
  if (req.query.maxWeight && req.query.minWeight) {
    query.weight = { $gt: req.query.minWeight, $lt: req.query.maxWeight };
  }
  try {
    const result = await Pet.find(query);
    return result;
  } catch (err) {
    console.log(err);
  }
}

const getIndividualPetDetailsModel = async (req) => {
  try {
    const result = await Pet.findById(req.params.id);
    return result;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

module.exports = {
  searchPetsGeneralModel,
  searchPetsFilterModel,
  getIndividualPetDetailsModel,
};
