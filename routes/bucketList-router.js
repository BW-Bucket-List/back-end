const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Users = require("../models/users-model");
const BucketLists = require("../models/bucketList-model");

const validation = require("../middleware/validation");
const restricted = require("../middleware/restricted-access");

router.get("/:id", (req, res) => {
  BucketLists.findById(req.params.id)
    .then(bucketList => res.status(200).json(bucketList))
    .catch(error =>
      res
        .status(500)
        .json({ errorMessage: "Problem with the request", error: error })
    );
});

//This route requires more sorting through promises
// router.get("/user/:id", (req, res) => {
//   BucketLists.findByUserId(req.params.id)
//     .then(bucketList => res.status(200).json(bucketList))
//     .catch(error =>
//       res
//         .status(500)
//         .json({
//           errorMessage: "Problem with Database processing",
//           error: error
//         })
//     );
// });

module.exports = router;
