const Users = require("../models/users-model");
const BucketLists = require("../models/bucketList-model");
module.exports = {
  validateUserID,
  validateBucketListID,
  validateBucketListItemID
};

function validateUserID(req, res, next) {
  Users.findById(req.params.id)
    .then(user => {
      if (user) {
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(error =>
      res.status(500).json({
        errorMessage: "Problem with processing in database",
        error: error
      })
    );
}

function validateBucketListID(req, res, next) {
  BucketLists.validateID(req.params.id)
    .then(bucket => {
      if (bucket) {
        next();
      } else {
        res.status(400).json({ message: "Invalid Bucketlist ID" });
      }
    })
    .catch(error =>
      res.status(500).json({
        errorMessage: "Problem with processing in database",
        error: error
      })
    );
}

function validateBucketListItemID(req, res, next) {}
