// server/db/index.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'food_recipe',
  password: 'pg',
  port: 5432,
});

module.exports = pool;
