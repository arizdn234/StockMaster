const fastify = require('fastify')({ logger: true });
const dotenv = require('dotenv');

dotenv.config();

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
