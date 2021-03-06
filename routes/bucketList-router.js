const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Users = require("../models/users-model");
const BucketLists = require("../models/bucketList-model");

const validationBucket = require("../middleware/validationDatabase");
const validation = require("../middleware/validation");
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

router.post("/", [restricted, validation.validateNewBucketList], (req, res) => {
  BucketLists.add(req.body)
    .then(newBucket => res.status(201).json(newBucket))
    .catch(error =>
      res
        .status(500)
        .json({ errorMessage: "Problem with the request", error: error })
    );
});

//router.put("/:id") updates bucket list name, require bucketlist id, check
router.put(
  "/:id",
  [
    restricted,
    validationBucket.validateBucketListID,
    validation.validateUpdateBucketList
  ],
  (req, res) => {
    BucketLists.update(req.body, req.params.id)
      .then(accepts => {
        if (accepts === 0) {
          res.status(400).json({
            error:
              "The BucketList with that ID doesn't exists so cannot be updated"
          });
        } else {
          res.status(202).json(accepts);
        }
      })
      .catch(error =>
        res
          .status(500)
          .json({ errorMessage: "Problem with the request", error: error })
      );
  }
);
//router.delete("/:id") deletes bucketlist, related bucketlistitems are also deleted
router.delete(
  "/:id",
  [restricted, validationBucket.validateBucketListID],
  (req, res) => {
    BucketLists.remove(req.params.id)
      .then(deleted =>
        res
          .status(200)
          .json({ listDeleted: deleted, message: "Successful Deletion" })
      )
      .catch(error =>
        res
          .status(500)
          .json({ errorMessage: "Problem with the request", error: error })
      );
  }
);
// **** Below are endpoints for adding items to bucketlist ***

//router.post(/items) -> Adds items to a bucketlist requires a item name & existing bucketlistID

router.post(
  "/items",
  [restricted, validation.validateNewBucketListItem],
  (req, res) => {
    BucketLists.addItem(req.body)
      .then(addedItem => res.status(201).json(addedItem))
      .catch(error =>
        res
          .status(500)
          .json({ errorMessage: "Problem with the request", error: error })
      );
  }
);

//router.put("/items") updates bucket items, requires bucketlistitem id and updates that item

router.put(
  "/items/:id",
  [
    restricted,
    validationBucket.validateBucketListItemID,
    validation.validateUpdateBucketListItem
  ],
  (req, res) => {
    BucketLists.updateItem(req.body, req.params.id)
      .then(accepts => {
        if (accepts === 0) {
          res.status(400).json({
            error:
              "The BucketListItem with that ID doesn't exists so cannot be updated"
          });
        } else {
          res.status(202).json(accepts);
        }
      })
      .catch(error =>
        res
          .status(500)
          .json({ errorMessage: "Problem with the request", error: error })
      );
  }
);

//router.delete("/items/:id") deletes items based on their Item ID

router.delete(
  "/items/:id",
  [restricted, validationBucket.validateBucketListItemID],
  (req, res) => {
    BucketLists.removeItem(req.params.id)
      .then(deleted =>
        res
          .status(200)
          .json({ ItemDeleted: deleted, message: "Successful Deletion" })
      )
      .catch(error =>
        res
          .status(500)
          .json({ errorMessage: "Problem with the request", error: error })
      );
  }
);

module.exports = router;
