async function validateEmail(req, res, next) {
  const regexEmail =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  const valid = regexEmail.test(req.body.email);
  if (valid) {
    next();
  } else {
    res.status(400).send("Invalid Email");
  }
}

module.exports = { validateEmail };
