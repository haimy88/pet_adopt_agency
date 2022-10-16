const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const petsRoutes = require("./routes/petRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const forgotPasswordRoutes = require("./routes/forgotPasswordRoutes");
require("dotenv").config();

const { Pet } = require("./data/querySchemas");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 3080;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use("/uploads", express.static("uploads"));

app.use("/", authRoutes);

app.use("/user", userRoutes);

app.use("/admin", adminRoutes);

app.use("/pet", petsRoutes);

app.use("/forgot_password", forgotPasswordRoutes);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
