const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

async function register(request, reply) {
    const { username, password } = request.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const [newAdmin] = await db('admin').insert({ username, password: hashedPassword }).returning('*');

    reply.code(201).send({ message: 'Admin registered successfully', admin: newAdmin });
}

async function login(request, reply) {
    const { username, password } = request.body;
    const admin = await db('admin').where({ username }).first();

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
        return reply.code(401).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    reply.send({ token });
}

module.exports = { register, login };
