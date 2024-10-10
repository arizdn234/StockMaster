const { register, login } = require('../controllers/auth.controller');

async function authRoutes(fastify, options) {
    fastify.post('/register', register);
    fastify.post('/login', login);
}

module.exports = authRoutes;
