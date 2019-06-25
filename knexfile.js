// Update with your config settings.
const localPg = {
  host: "localhost",
  database: "test",
  user: "test",
  password: "test"
};

const prodDbConnection = process.env.DATABASE_URL || localPg;

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./data/sqlite3.db3"
    },
    pool: {
      //SQLite will not enforce foreign key by default
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    },
    migrations: {
      directory: "./data/migrations"
    },
    seed: "./data/seeds"
  },

  production: {
    client: "pg",
    connection: prodDbConnection,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
