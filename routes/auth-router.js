const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../models/users-model");
const validation = require("../middleware/validation");
const secrets = require("../config/jwt");

router.post("/register", validation.validateRegister, (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(newUser => {
      const { user_id, username } = newUser;
      res.status(201).json({
        message: "Successfully Created an Account",
        user_id,
        username
      });
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Opps something bugged out", error: error });
    });
});

router.post("/login", validation.validateUser, (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token, user });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

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
