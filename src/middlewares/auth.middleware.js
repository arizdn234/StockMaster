const fastifyJwt = require('@fastify/jwt');

module.exports = (fastify) => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET,
  });

  return async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  };
};
