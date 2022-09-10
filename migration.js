const { createPool } = require("mysql");
var migration = require('mysql-migrations');

const pool = createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'watch_party',
  connectionLimit: 10
});
migration.init(pool, __dirname + '/migrations');

module.exports = pool;