const db = require("../database/dbConfig");

module.exports = { add, find, findBy, findById, update, remove };

function add(user) {
  return db("users")
    .insert(user)
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function find() {
  return db("users").select("*");
}

function findById(id) {
  return db("users")
    .where("user_id", id)
    .first();
}

function findBy(filter) {
  return db("users").where(filter);
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}

function update(data, id) {
  return db("users")
    .where({ id })
    .update(data);
}
