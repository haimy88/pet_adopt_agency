const {
  signUpModel,
  getUserByIdModel,
  getAllUsersModel,
  updateUserModel,
} = require("../models/usersModel");
const {
  getAllOwnedAndSavedPetsModel,
  getUserRequestsModel,
} = require("../models/ownPetsModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function signup(req, res) {
  try {
    const user = signUpModel(req.body);
    if (user.error) {
      throw new Error(user.err);
    }
    res
      .status(200)
      .send(
        `Congratulations, ${user.firstName}, and welcome to our community! Use your credentials to login and start making some Furiends :)`
      );
  } catch (err) {
    res.status(500).send(err);
  }
}

async function login(req, res) {
  try {
    const { user, password, email } = req.body;
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { id: user._id.toString() },
          process.env.TOKEN_SECRET_KEY,
          {
            expiresIn: "24h",
          }
        );
        res.send({
          id: user._id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          isAdmin: user.isAdmin,
          bio: user.bio,
          token,
        });
      } else {
        res.status(500).send("Incorrect Password");
        return;
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getUserById(req, res) {
  try {
    const user = await getUserByIdModel(req.params.id);
    if (user.error) {
      throw new Error(user.err);
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await getAllUsersModel();
    if (users.error) {
      throw new Error(users.err);
    }
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function updateUser(req, res) {
  try {
    const update = await updateUserModel(req.params.id, req);
    if (update.error) {
      throw new Error(update.err);
    }
    res.status(200).send({
      id: update[0]._id.toString(),
      email: update[0].email,
      firstName: update[0].firstName,
      lastName: update[0].lastName,
      phoneNumber: update[0].phoneNumber,
      isAdmin: update[0].isAdmin,
      bio: update[0].bio,
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getFullUserInfo(req, res) {
  try {
    const all_pets = await getAllOwnedAndSavedPetsModel(req.params.id);
    if (all_pets.error) {
      throw new Error(all_pets.err);
    }
    const user = await getUserByIdModel(req.params.id);
    if (user.error) {
      throw new Error(user.err);
    }
    const everything = [all_pets, user];
    res.status(200).send(everything);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getUserRequests(req, res) {
  try {
    const user_requests = await getUserRequestsModel(req.params.id);
    if (user_requests.error) {
      throw new Error(user_requests.err);
    }
    res.status(200).send(user_requests);
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  signup,
  login,
  getUserById,
  getAllUsers,
  updateUser,
  getFullUserInfo,
  getUserRequests,
};
