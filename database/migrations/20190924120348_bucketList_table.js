exports.up = function(knex) {
  return knex.schema.createTable("bucketLists", bucketList => {
    bucketList.increments("bucket_list_id");
    bucketList.string("bucket_list_name").notNullable();
    bucketList
      .integer("bucket_list_user_id")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    bucketList.boolean("private").defaultTo(true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("bucketLists");
};
