const knex = require('../db');

const Item = {
  create: async (data) => {
    return knex('items').insert(data);
  },
  findById: async (id) => {
    return knex('items').where({ id }).first();
  },
  update: async (id, data) => {
    return knex('items').where({ id }).update(data);
  },
  reduceStock: async (id, amount) => {
    return knex('items').where({ id }).decrement('stock', amount);
  },
  getTotalValue: async () => {
    return knex('items').sum(knex.raw('stock * price as total_value')).first();
  },
};

module.exports = Item;
