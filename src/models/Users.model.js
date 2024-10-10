const knex = require('../db');
const bcrypt = require('bcryptjs');

const Admin = {
  create: async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return knex('admin').insert({ ...data, password: hashedPassword });
  },
  findByUsername: async (username) => {
    return knex('admin').where({ username }).first();
  },
};

module.exports = Admin;
