const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users").insert([
    {
      user_id: 1,
      username: "bill124",
      password: bcrypt.hashSync("password123"),
      email: "billy@wildwest.com"
    },
    {
      user_id: 2,
      username: "bucketboy",
      password: bcrypt.hashSync("bucket"),
      email: "bucky@buck.com"
    }
  ]);
};
