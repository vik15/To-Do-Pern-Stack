const pgp = require("pg-promise")();

const config = {
  connectionString: "postgres://username:password@localhost:5432/database_name",
};

const db = pgp(config);

module.exports = db;
