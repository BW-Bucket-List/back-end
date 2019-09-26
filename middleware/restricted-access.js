const jwt = require("jsonwebtoken");

const secrets = require("../config/jwt.js");

module.exports = function restricted(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        // token is invalid
        console.log(err);
        res
          .status(401)
          .json({ message: "Your token is invalid. You are unauthorized." });
      } else {
        // good token
        req.username = { username: decodedToken.username };
        req.userId = decodedToken.subject;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Get a token and try again. :-)" });
  }
};
