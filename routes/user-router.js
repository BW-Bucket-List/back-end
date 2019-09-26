const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Users = require("../models/users-model");
const validation = require("../middleware/validation");
const restricted = require("../middleware/restricted-access");

router.get("/:id", restricted, (req, res) => {
  Users.findUserWithData(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(error =>
      res
        .status(500)
        .json({ errorMessage: "Problem with the request", error: error })
    );
});

module.exports = router;
