const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../data/querySchemas");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");

let transporter = nodemailer.createTransport({
  service: "Outlook",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

async function sendEmail(req, res) {
  const email = req.body.email;
  try {
    currentUser = await User.find({ email: email });
    const secret = process.env.TOKEN_SECRET_KEY + currentUser[0].password;
    const payload = { email: email, id: currentUser._id };
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    const id = currentUser[0]._id;
    const link = `http://localhost:3080/forgot_password/reset/${id}/${token}`;
    let mailOptions = {
      from: "testhaimdev@outlook.com",
      to: `${email}`,
      subject: "Reset Password Link",
      text: `Rest your password here: ${link}`,
      html: { path: `backend/views/reset-password.ejs` },
    };
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        res.send("Error has occurred");
      } else {
        console.log("email sent");
      }
    });
    res.send("Password reset link has been sent to your email");
  } catch (err) {
    res.status(400).send("Error sending email with link");
  }
}

async function resetPassword(req, res) {
  const { id, token } = req.params;
  find_user = await User.find({ _id: id });
  if (find_user.length === 0) {
    res.send("Invalid Id");
    return;
  }

  const secret = process.env.TOKEN_SECRET_KEY + find_user[0].password;

  try {
    const payload = jwt.verify(token, secret);
    res.render("reset-password", { email: find_user[0].email });
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
}

async function newPassword(req, res) {
  const { id, token } = req.params;
  const { password } = req.body;
  find_user = await User.find({ _id: id });
  if (find_user.length === 0) {
    res.send("Invalid Id");
    return;
  }
  const secret = process.env.TOKEN_SECRET_KEY + find_user[0].password;
  try {
    const payload = jwt.verify(token, secret);
    update = { password: password };
    await User.findOneAndUpdate({ _id: id }, update);
    res.send("Password updated Successfully!");
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
}

module.exports = { sendEmail, resetPassword, newPassword };
