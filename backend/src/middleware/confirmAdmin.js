const { User } = require("../data/querySchemas");

async function confirmAdmin(req, res, next) {
  const user = await User.findById(req.body.userId);
  user.isAdmin ? next() : res.status(400).send("Not Authorized");
}

module.exports = { confirmAdmin };
