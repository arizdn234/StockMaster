const itemController = require('../controllers/item.controller');
const authMiddleware = require('../middlewares/auth.middleware');

module.exports = function (fastify, opts, done) {
  fastify.post('/items', { preHandler: [authMiddleware] }, itemController.createItem);
  fastify.put('/items/:id', { preHandler: [authMiddleware] }, itemController.updateItem);
  fastify.post('/items/:id/reduce-stock', { preHandler: [authMiddleware] }, itemController.reduceStock);
  fastify.get('/inventory-value', { preHandler: [authMiddleware] }, itemController.getAllItems);

  done();
};
