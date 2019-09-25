const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Users = require("../models/users-model");
const validation = require("../middleware/validation");
const restricted = require("../middleware/restricted-access");
const secrets = require("../config/jwt");
const BucketLists = require("../models/bucketList-model");

router.get("/:id", restricted, (req, res) => {
  Users.findUserWithData(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(error =>
      res
        .status(500)
        .json({ errorMessage: "Problem with the request", error: error })
    );
});
router.get("/buckets/:id", (req, res) => {
  BucketLists.findById(req.params.id)
    .then(bucketList => res.status(200).json(bucketList))
    .catch(error =>
      res
        .status(500)
        .json({ errorMessage: "Problem with the request", error: error })
    );
});
module.exports = router;
