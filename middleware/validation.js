module.exports = { validateUser };

function validateUser(req, res, next) {
  if (req.body.username === undefined) {
    res.status(400).json({ errorMessage: "Missing a username" });
  } else if (req.body.password === undefined) {
    res.status(400).json({ errorMessage: "Missing a password" });
  } else {
    next();
  }
}
