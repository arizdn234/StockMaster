const itemController = require('../controllers/item.controller');
const authMiddleware = require('../middlewares/auth.middleware');

module.exports = function (fastify, opts, done) {
    fastify.post('/', { preHandler: [authMiddleware] }, itemController.createItem);
    fastify.put('/:id', { preHandler: [authMiddleware] }, itemController.updateItem);
    fastify.post('/:id/reduce-stock', { preHandler: [authMiddleware] }, itemController.reduceStock);
    fastify.get('/', { preHandler: [authMiddleware] }, itemController.getAllItems);

    done();
};
