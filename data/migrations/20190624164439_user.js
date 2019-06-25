exports.up = function(knex, Promise) {
  return knex.schema.createTable("User", table => {
    table.increments();
    table
      .string("username", 125)
      .notNullable()
      .unique();
    table.string("password", 125).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("User");
};
