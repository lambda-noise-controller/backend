const database = require("../data/databaseConfig");

module.exports = {
  add,
  findById,
  find,
  findBy,
  destroy
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
