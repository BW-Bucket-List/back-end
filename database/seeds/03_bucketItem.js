exports.seed = function(knex) {
  // Inserts seed entries
  return knex("bucketListsItems").insert([
    {
      bucket_list_item_name: "Fly to Spain",
      completed: true,
      bucket_list_item_journal: "https://www.runningofthebulls.com/",
      bucket_list_id: 1
    },
    {
      bucket_list_item_name: "Gears 5",
      completed: true,
      bucket_list_item_journal: "https://www.gears5.com/",
      bucket_list_id: 2
    },
    {
      bucket_list_item_name: "Destiny 2 Shadowkeep",
      completed: false,
      bucket_list_item_journal:
        "https://www.bungie.net/7/en/Destiny/Shadowkeep",
      bucket_list_id: 2
    },
    {
      bucket_list_item_name: "Spider-Man",
      completed: true,
      bucket_list_item_video:
        "https://www.youtube.com/watch?time_continue=15&v=fy3R3h-Ael4",
      bucket_list_id: 2
    }
  ]);
};
