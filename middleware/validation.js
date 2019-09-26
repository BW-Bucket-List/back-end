module.exports = {
  validateUser,
  validateRegister,
  validateUserUpdate,
  validateNewBucketList,
  validateUpdateBucketList,
  validateNewBucketListItem,
  validateUpdateBucketListItem
};

function validateUser(req, res, next) {
  if (req.body.username === undefined) {
    res.status(400).json({ errorMessage: "Missing a username" });
  } else if (req.body.password === undefined) {
    res.status(400).json({ errorMessage: "Missing a password" });
  } else {
    next();
  }
}

function validateUserUpdate(req, res, next) {
  if (req.body.username === undefined) {
    res.status(400).json({ errorMessage: "Missing a username" });
  } else if (req.body.email === undefined) {
    res.status(400).json({ errorMessage: "Missing an email" });
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

function validateNewBucketList(req, res, next) {
  if (req.body.bucket_list_name === undefined) {
    res.status(400).json({
      errorMessage: "Missing a bucket_list_name field for bucketlist"
    });
  } else if (req.body.bucket_list_user_id === undefined) {
    res.status(400).json({
      errorMessage: "Missing a bucket_list_user_id field for bucketlist"
    });
  } else {
    next();
  }
}

function validateUpdateBucketList(req, res, next) {
  if (req.body.bucket_list_name === undefined) {
    res.status(400).json({
      errorMessage: "Missing a bucket_list_name field for bucketlist"
    });
  } else {
    next();
  }
}

function validateNewBucketListItem(req, res, next) {
  if (req.body.bucket_list_item_name === undefined) {
    res.status(400).json({
      errorMessage: "Missing a bucket_list_item_name field for Bucketlist Item"
    });
  } else if (req.body.bucket_list_id === undefined) {
    res.status(400).json({
      errorMessage:
        "Missing a bucket_list_id field for BucketList ID so it can be added to right bucketlist"
    });
  } else {
    next();
  }
}

function validateUpdateBucketListItem(req, res, next) {
  if (req.body.bucket_list_item_name === undefined) {
    res.status(400).json({
      errorMessage: "Missing a bucket_list_item_name field for bucketlist Items"
    });
  } else {
    next();
  }
}
