const db = require("../database/dbConfig");

module.exports = {
  add,
  find,
  findById
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
    .insert(newBucket)
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function find() {
  return db("bucketLists").select("*");
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
function sortByBucketLists(id) {}
