exports.up = function(knex, Promise) {
  return knex.schema.createTable("Classroom", table => {
    table.increments();
    table.string("classroom", 125).notNullable();

    table
      .integer("threshold")
      .notNullable()
      .defaultsTo(0);

    table
      .integer("timer")
      .notNullable()
      .defaultsTo(0);

    table
      .integer("teacher_id")
      .notNullable()
      .references("id")
      .inTable("User")
      .onDelete("CASCADE")
      .index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("Classroom");
};
