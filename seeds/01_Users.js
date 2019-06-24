exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("User")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("User").insert([
        { user_name: "testing01", password: "testing01" },
        { user_name: "testing02", password: "testing02" }
      ]);
    });
};
