const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: "string" },
  lastName: { type: "string" },
  email: { type: "string", unique: true },
  phoneNumber: { type: "string" },
  password: { type: "string" },
  isAdmin: { type: "boolean" },
  bio: { type: "string" },
  created: { type: Date, default: Date.now() },
});

const petSchema = new mongoose.Schema({
  name: String,
  type: String,
  bio: String,
  status: String,
  height: Number,
  weight: Number,
  color: String,
  hyperallergenic: Boolean,
  dietary_restrictions: String,
  breed: String,
  img: {
    type: String,
    default: "https://images.dog.ceo/breeds/eskimo/n02109961_2272.jpg",
  },
  cloudinary_id: { type: "string"},
  created: { type: Date, default: Date.now() },
});

const ownPetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userFirstName: { type: "string" },
  petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
  petName: { type: "string" },
  startDate: { type: Date },
  endDate: { type: Date, required: false },
  type: { type: "string" },
  status: { type: "string", required: false },
  created: { type: Date, default: Date.now() },
});

const savePetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
  created: { type: Date, default: Date.now() },
});

const User = mongoose.model("User", UserSchema);
const Pet = mongoose.model("Pet", petSchema);
const Ownership = mongoose.model("Ownership", ownPetSchema);
const SavedPet = mongoose.model("SavedPet", savePetSchema);

module.exports = { User, Pet, Ownership, SavedPet };
