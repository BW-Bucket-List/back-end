exports.seed = function(knex) {
  // Inserts seed entries
  return knex("bucketLists").insert([
    {
      bucket_list_id: 1,
      bucket_list_name: "Running with the bulls",
      bucket_list_user_id: 1,
      private: true
    },
    {
      bucket_list_id: 2,
      bucket_list_name: "Bucky's Top 3 games",
      bucket_list_user_id: 2,
      private: false
    },
    {
      bucket_list_id: 3,
      bucket_list_name: "Bucky's Favorite Games",
      bucket_list_user_id: 2,
      private: true
    },
    {
      bucket_list_id: 4,
      bucket_list_name: "Bucky's Scuba Diving Goals",
      bucket_list_user_id: 2,
      private: false
    }
  ]);
};
