const knex = require('../db');

const Transaction = {
  create: async (data) => {
    return knex('transactions').insert(data);
  },
  findPaginated: async (page, limit) => {
    return knex('transactions')
      .join('items', 'transactions.item_id', '=', 'items.id')
      .select('transactions.*', 'items.name')
      .paginate({ perPage: limit, currentPage: page, isLengthAware: true });
  },
};

module.exports = Transaction;
