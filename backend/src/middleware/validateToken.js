require("dotenv").config();
const jwt = require("jsonwebtoken");

function validateToken(req, res, next) {
  const headersToken = req.headers.authorization;
  const token = headersToken.replace("Bearer ", "");
  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).send("Invalid Token");
      return;
    }
    req.body.userId = decoded.id;
    next();
  });
}

module.exports = { validateToken };
