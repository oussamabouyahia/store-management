const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
var connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
module.exports = connection;
