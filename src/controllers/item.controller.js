const db = require('../db');

async function getAllItems(request, reply) {
    try {
        const items = await db('items').select('*');
        return reply.send(items);
    } catch (error) {
        return reply.code(500).send({ error: 'Database error', message: error.message });
    }
}

async function createItem(request, reply) {
    const { name, category, stock, price } = request.body;
    try {
        const [newItem] = await db('items').insert({ name, category, stock, price }).returning('*');
        return reply.code(201).send(newItem);
    } catch (error) {
        return reply.code(500).send({ error: 'Failed to create item', message: error.message });
    }
}

async function updateItem(request, reply) {
    const { id } = request.params;
    const { name, category, stock, price } = request.body;
    try {
        await db('items').where({ id }).update({ name, category, stock, price });
        return reply.send({ message: 'Item updated successfully' });
    } catch (error) {
        return reply.code(500).send({ error: 'Failed to update item', message: error.message });
    }
}

async function reduceStock(request, reply) {
    const { id } = request.params;
    const { amount } = request.body;
    try {
        await db('items').where({ id }).decrement('stock', amount);
        return reply.send({ message: 'Stock reduced successfully' });
    } catch (error) {
        return reply.code(500).send({ error: 'Failed to reduce stock', message: error.message });
    }
}

async function calculateTotalValue(request, reply) {
    try {
        const items = await db('items').select('price', 'stock');
        const totalValue = items.reduce((sum, item) => sum + (item.price * item.stock), 0);
        return reply.send({ totalInventoryValue: totalValue });
    } catch (error) {
        return reply.code(500).send({ error: 'Failed to calculate total value', message: error.message });
    }
}

module.exports = { getAllItems, createItem, updateItem, reduceStock, calculateTotalValue };
