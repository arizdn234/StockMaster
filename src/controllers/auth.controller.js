const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

async function register(request, reply) {
    const { username, password } = request.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const [newUsers] = await db('users').insert({ username, password: hashedPassword }).returning('*');

    reply.code(201).send({ message: 'Users registered successfully', users: newUsers });
}

async function login(request, reply) {
    const { username, password } = request.body;
    const users = await db('users').where({ username }).first();

    if (!users || !(await bcrypt.compare(password, users.password))) {
        return reply.code(401).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: users.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    reply.send({ token });
}

module.exports = { register, login };
