exports.up = function(knex, Promise) {
  return knex.schema.createTable("User", table => {
    table.increments();
    table
      .string("user_name")
      .notNullable()
      .unique();
    table.string("password").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("User");
};
