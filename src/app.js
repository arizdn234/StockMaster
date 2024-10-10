const fastify = require('fastify')({ logger: true });
const dotenv = require('dotenv');
const fastifyJwt = require('@fastify/jwt');
const cors = require('@fastify/cors');

dotenv.config();

// Register CORS plugin
fastify.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

// plugin JWT
fastify.register(fastifyJwt, { secret: process.env.JWT_SECRET });

// Middleware auth
fastify.decorate('authenticate', async (request, reply) => {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.send(err);
    }
});

// route
const itemRoutes = require('./routes/item.routes');
const authRoutes = require('./routes/auth.routes');

fastify.register(itemRoutes, { prefix: '/items' });
fastify.register(authRoutes, { prefix: '/auth' });

const start = async () => {
    try {
        await fastify.listen({ port: 8787 });
        fastify.log.info(`Server listening on http://localhost:8787`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
