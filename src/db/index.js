const knex = require('knex');
const knexConfig = require('../../knexfile');

// Use the development configuration
const db = knex(knexConfig.development);

module.exports = db;
