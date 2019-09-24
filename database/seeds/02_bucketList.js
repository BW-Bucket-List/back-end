exports.seed = function(knex) {
  // Inserts seed entries
  return knex("bucketLists").insert([
    {
      bucket_list_name: "Running with the bulls",
      bucket_list_user_id: 1,
      private: true
    },
    {
      bucket_list_name: "Bucky's Top 3 games",
      bucket_list_user_id: 2,
      private: false
    }
  ]);
};
