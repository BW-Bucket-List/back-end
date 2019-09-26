const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Users = require("../models/users-model");
const BucketLists = require("../models/bucketList-model");

const validationBucket = require("../middleware/validationDatabase");
const restricted = require("../middleware/restricted-access");

router.get(
  "/:id",
  [restricted, validationBucket.validateBucketListID],
  (req, res) => {
    BucketLists.findById(req.params.id)
      .then(bucketList => res.status(200).json(bucketList))
      .catch(error =>
        res
          .status(500)
          .json({ errorMessage: "Problem with the request", error: error })
      );
  }
);

//router.get('/') sends list of bucketlists ONLY the shareable ones and requires auth to access

router.get("/", restricted, (req, res) => {
  BucketLists.find()
    .then(bucketList => res.status(200).json(bucketList))
    .catch(error =>
      res
        .status(500)
        .json({ errorMessage: "Problem with the request", error: error })
    );
});

//router.post("/") -> Creates a new bucket list, requires user id, bucketlist name, validates user id first before running

//router.post(/items) -> Adds items to a bucketlist requires a item name & existing bucketlistID

//router.put("/") updates bucket list name, require bucketlist id, check

//router.put("/items") updates bucket items, requires bucketlistitem id and updates that item

//router.delete("/items/:id") deletes items based on their Item ID

//router.delete("/:id") deletes bucketlist, related bucketlistitems are also deleted

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
