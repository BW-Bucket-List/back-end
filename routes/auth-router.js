const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secrets = require("../config/jwt");

function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username
    // ...other data
  };
  const options = {
    expiresIn: "5h"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
