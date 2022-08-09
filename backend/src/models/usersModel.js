const { User } = require("../data/querySchemas");

async function getUserByEmail(email) {
  try {
    const queryResult = await User.find({ email: email });
    return queryResult;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
}

function signUpModel(newUser) {
  try {
    const user = new User({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      password: newUser.password,
      isAdmin: false,
    });
    user.save();
    return user;
  } catch (err) {
    return { error: err };
  }
}

async function getUserByIdModel(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (err) {
    return { error: err };
  }
}

const getAllUsersModel = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    return { error: err };
  }
};

const updateUserModel = async (id, req) => {
  try {
    let update = {};
    if (req.body.firstName) {
      update.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      update.lastName = req.body.lastName;
    }
    if (req.body.password) {
      update.password = req.body.password;
    }
    if (req.body.phoneNumber) {
      update.phoneNumber = req.body.phoneNumber;
    }
    if (req.body.bio) {
      update.bio = req.body.bio;
    }
    await User.findOneAndUpdate({ _id: id }, update);
    const updated = await User.find({ _id: id });
    return updated;
  } catch (err) {
    return { error: err };
  }
};

module.exports = {
  signUpModel,
  getUserByEmail,
  getUserByIdModel,
  getAllUsersModel,
  updateUserModel,
};
