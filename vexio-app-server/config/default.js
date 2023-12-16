require("dotenv").config();

const { PORT, DB_USERNAME, DB_NAME, DB_PASSWORD, DB_PORT, DB_HOST } =
  process.env;

module.exports = {
  port: PORT || 4000,
  username: DB_USERNAME,
  database: DB_NAME,
  password: DB_PASSWORD,
  db_port: DB_PORT,
  host: DB_HOST,
};
