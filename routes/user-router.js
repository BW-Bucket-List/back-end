const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Users = require("../models/users-model");
const validationUser = require("../middleware/validationDatabase");
const restricted = require("../middleware/restricted-access");

router.get("/:id", [restricted, validationUser.validateUserID], (req, res) => {
  Users.findUserWithData(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(error =>
      res
        .status(500)
        .json({ errorMessage: "Problem with the request", error: error })
    );
});

//router.put => user is updated at ID Validate everything except password
router.put("/:id", [restricted, validationUser.validateUserID], (req, res) => {
  Users.update(req.body, req.params.id)
    .then(accepts => {
      if (accepts === 0) {
        res.status(400).json({
          error: "The user with that ID doesn't exists so cannot be updated"
        });
      } else {
        res.status(202).json(accepts);
      }
    })
    .catch(error =>
      res.status(500).json({
        errorMessage: "Problem with processing in database",
        error: error
      })
    );
});
module.exports = router;
