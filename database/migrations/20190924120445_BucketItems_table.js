exports.up = function(knex) {
  return knex.schema.createTable("bucketListsItems", items => {
    items.increments("item_id");
    items.string("bucket_list_item_name", 128).notNullable();
    items.boolean("completed").defaultTo(false);
    items.string("bucket_list_item_photo", 128);
    items.string("bucket_list_item_journal", 128);
    items.string("bucket_list_item_voice", 128);
    items.string("bucket_list_item_video", 128);
    items
      .integer("bucket_list_id")
      .unsigned()
      .notNullable()
      .references("bucket_list_id")
      .inTable("bucketLists")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("bucketListsItems");
};
