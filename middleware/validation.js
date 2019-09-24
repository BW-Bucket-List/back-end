module.exports = { validateUser, validateRegister };

function validateUser(req, res, next) {
  if (req.body.username === undefined) {
    res.status(400).json({ errorMessage: "Missing a username" });
  } else if (req.body.password === undefined) {
    res.status(400).json({ errorMessage: "Missing a password" });
  } else {
    next();
  }
}

function validateRegister(req, res, next) {
  if (req.body.username === undefined) {
    res.status(400).json({ errorMessage: "Missing a username" });
  } else if (req.body.password === undefined) {
    res.status(400).json({ errorMessage: "Missing a password" });
  } else if (req.body.email === undefined) {
    res.status(400).json({ errorMessage: "Missing an email" });
  } else {
    next();
  }
}
