const database = require("../data/databaseConfig");

module.exports = {
  add,
  findById,
  find,
  findBy,
  destroy,
  findClassById,
  addClass
};

function find() {
  return database("User").select("username", "password", "id");
}

function findBy(filter) {
  return database("User").where(filter);
}

function findById(id) {
  return database("User")
    .where({ id })
    .first();
}

function add(user) {
  return database("User")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function destroy(id) {
  return database("User")
    .where({ id: id })
    .del();
}

/************** Classroom Model *********************/

function findClassById(id) {
  return database("Classroom").where({ teacher_id: id });
  // .first();
}

function addClass(classroom) {
  return database("Classroom")
    .insert(classroom, "id")
    .then(ids => {
      const [id] = ids;
      return findClassById(id);
    });
}
