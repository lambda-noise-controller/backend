const database = require("../data/databaseConfig");

module.exports = {
  add,
  findById,
  find,
  findBy,
  destroy
};

const table = database("User");

function find() {
  return table.select("user_name", "password", "id");
}

function findBy(filter) {
  return table.where(filter);
}

function findById(id) {
  return table.where({ id });
}

function add(user) {
  return table.insert(user).then(ids => {
    const [id] = ids;
    return findById(id);
  });
}

function destroy(id) {
  return table.where(id).del();
}
