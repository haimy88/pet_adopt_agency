const signUpSchema = {
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string" },
    phoneNumber: { type: "string" },
    password: { type: "string" },
    repassword: { type: "string" },
  },
  required: ["firstName", "lastName", "email", "phoneNumber", "password"],
  additionalProperties: false,
};

const loginSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

const ownPetSchema = {
  type: "object",
  properties: {
    type: { type: "string" },
    userId: { type: "string" },
    petId: { type: "string" },
    startDate: { type: "date" },
    endDate: { type: "date" },
  },
  required: ["startDate", "type"],
  additionalProperties: false,
};

const savePetSchema = {
  type: "object",
  properties: {
    userId: { type: "string" },
  },
  required: [],
  additionalProperties: false,
};

module.exports = { signUpSchema, loginSchema, ownPetSchema, savePetSchema };
