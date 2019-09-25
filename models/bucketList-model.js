const db = require("../database/dbConfig");

module.exports = {
  add,
  find,
  findById
};

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
  return db("bucketLists as BL")
    .where("bucket_list_id", id)
    .first()
    .then(bucketlist => {
      currentBucketList = { ...bucketlist };
      return db("bucketListsItems")
        .where("bucket_list_id", bucketlist.bucket_list_id)
        .then(items => {
          currentBucketList.items = items;
          return currentBucketList;
        });
    });
}

function sortByBucketLists(id) {}