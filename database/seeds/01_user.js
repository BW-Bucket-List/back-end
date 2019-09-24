const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users").insert([
    {
      username: "bill124",
      password: bcrypt.hashSync("password123"),
      email: "billy@wildwest.com"
    },
    {
      username: "bucketboy",
      password: bcrypt.hashSync("bucket"),
      email: "bucky@buck.com"
    }
  ]);
};
