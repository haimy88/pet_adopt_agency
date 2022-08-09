const { SavedPet, Ownership } = require("../data/querySchemas");

async function checkUniqueSaved(req, res, next) {
  const existing_item = await SavedPet.find({
    userId: req.body.userId,
    petId: req.body._id,
  });
  existing_item.length > 0 ? res.send("This has already been saved!") : next();
}

async function checkUniqueOwnership(req, res, next) {
  const existing_item = await Ownership.find({
    userId: req.body.userId,
    petId: req.body.petId,
  });
  if (
    existing_item.length > 0 &&
    existing_item.some((item) => item.status === "Pending Approval")
  ) {
    res.send("A request has already been made!");
  } else if (existing_item.length > 0) {
    res.send("You have already owned this pet previously");
  } else next();
}

module.exports = { checkUniqueSaved, checkUniqueOwnership };
