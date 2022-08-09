const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "Outlook",
  auth: {
    user: "testhaimdev@outlook.com",
    pass: "joshisaDEITY123",
  },
});

let mailOptions = {
  from: "testhaimdev@outlook.com",
  to: `${email}`,
  subject: "Reset Password Link",
  text: `Rest your password here: ${url}`,
};

transporter.sendMail(mailOptions, function (err, data) {
  if (err) {
    console.log("Error has occurred");
  } else {
    console.log("email sent");
  }
});
