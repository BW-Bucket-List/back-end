const db = require("../database/dbConfig");

module.exports = {
  add,
  find,
  findById,
  validateID,
  update,
  remove,
  findItem,
  addItem,
  updateItem,
  removeItem
};

function intToBoolean(int) {
  return int === 1 ? true : false;
}

function conversion(bucket) {
  const convert = {
    ...bucket,
    private: intToBoolean(bucket.private)
  };
  return convert;
}
function completedConversion(complete) {
  const convert = {
    ...complete,
    completed: intToBoolean(complete.completed)
  };
  return convert;
}

function add(newBucket) {
  return db("bucketLists")
    .insert(newBucket, "bucket_list_id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

//returns all bucketlists that non-private
function find() {
  return db("bucketLists")
    .select("*")
    .where("private", false);
}

function validateID(id) {
  return db("bucketLists")
    .where("bucket_list_id", id)
    .first();
}

function findById(id) {
  return db("bucketLists")
    .where("bucket_list_id", id)
    .first()
    .then(bucketList => {
      currentBucketList = { ...bucketList };
      return db("bucketListsItems")
        .where("bucket_list_id", bucketList.bucket_list_id)
        .then(items => {
          currentBucketList.items = items.map(e => completedConversion(e));
          return conversion(currentBucketList);
        });
    });
}

function update(data, id) {
  return db("bucketLists")
    .where("bucket_list_id", id)
    .update(data)
    .then(accepted => {
      if (accepted === 1) {
        return findById(id);
      } else {
        return accepted;
      }
    });
}

function remove(id) {
  return db("bucketLists")
    .where("bucket_list_id", id)
    .del();
}

function findItem(id) {
  return db("bucketListsItems")
    .where("item_id", id)
    .first()
    .then(item => completedConversion(item));
}

function addItem(newItem) {
  return db("bucketListsItems")
    .insert(newItem, "item_id")
    .then(ids => {
      const [id] = ids;
      return findItem(id);
    });
}
function updateItem(data, id) {
  return db("bucketListsItems")
    .where("item_id", id)
    .update(data)
    .then(accepted => {
      if (accepted === 1) {
        return findItem(id);
      } else {
        return accepted;
      }
    });
}
function removeItem(id) {
  return db("bucketListsItems")
    .where("item_id", id)
    .del();
}

// function findByUserId(id) {
//   return db("bucketLists").where("bucket_list_user_id", id);
//   // .then(bucketList => {
//   //   currentBucketList = { ...bucketList };
//   //   return db("bucketListsItems")
//   //     .where("bucket_list_id", bucketList.bucket_list_id)
//   //     .then(items => {
//   //       currentBucketList.items = items;
//   //       return currentBucketList;
//   //     });
//   // });
// }
