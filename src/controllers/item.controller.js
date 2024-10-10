const db = require('../db');

async function getAllItems(request, reply) {
    const items = await db('items').select('*');
    return items;
}

async function createItem(request, reply) {
    const { name, category, stock, price } = request.body;
    const [newItem] = await db('items').insert({ name, category, stock, price }).returning('*');
    return reply.code(201).send(newItem);
}

async function updateItem(request, reply) {
    const { id } = request.params;
    const { name, category, stock, price } = request.body;
    await db('items').where({ id }).update({ name, category, stock, price });
    return reply.send({ message: 'Item updated successfully' });
}

async function reduceStock(request, reply) {
    const { id } = request.params;
    const { amount } = request.body;
    await db('items').where({ id }).decrement('stock', amount);
    return reply.send({ message: 'Stock reduced successfully' });
}

async function calculateTotalValue(request, reply) {
    const items = await db('items').select('price', 'stock');
    const totalValue = items.reduce((sum, item) => sum + (item.price * item.stock), 0);
    return reply.send({ totalInventoryValue: totalValue });
}

module.exports = { getAllItems, createItem, updateItem, reduceStock, calculateTotalValue };
