const express = require('express');
const routes = express.Router();

const authController = require('./app/controllers/authController');
const projectController = require('./app/controllers/projectController');
const productController = require('./app/controllers/productController');
const tecidoController = require('./app/controllers/tecidoController');

// require('./app/controllers/index');

const authMiddleware = require('./app/middlewares/auth');
const orderController = require('./app/controllers/orderController');

//Usuario
routes.post('/register', authController.create);
routes.post('/authenticate', authController.auth);
routes.get('/users', authMiddleware, authController.index);
routes.put('/update', authMiddleware, authController.update);
routes.post('/forgot_password', authController.forgotPassword);
routes.post('/reset_password', authController.resetPassword);
routes.get('/user', authMiddleware, authController.indexOne);
routes.post('/address', authController.updateAddress);

//Tecido
routes.get('/categoria', tecidoController.listarCategorias);
routes.get('/categoria/:categoriaId', tecidoController.listarUmaCategoria);
routes.get('/tecido', tecidoController.listarTecidos);
routes.get('/tecidoCat/:categoriaId', tecidoController.listarTecidosDeCategoria);
routes.get('/tecido/:tecidoId', tecidoController.listarUmTecido);
routes.post('/categoria', tecidoController.createCategoria);
routes.post('/tecido', tecidoController.createTecido);
routes.put('/tecido/:tecidoId', tecidoController.adicionarCategoria);
routes.delete('/categoria/:categoriaId/:tecidoId', tecidoController.removeCategoria);
routes.delete('/tecido/:tecidoId', tecidoController.removeTecido);

//Product & Category
routes.post('/category', authMiddleware, productController.create);
routes.get('/category/:categoryId', authMiddleware, productController.indexOne);
routes.get('/category', authMiddleware, productController.index);
routes.put('/category/:categoryId', authMiddleware, productController.update);
routes.delete('/category/:categoryId', authMiddleware, productController.delete);
routes.delete('/category/:categoryId/:productId', authMiddleware, productController.deleteProd);

//Orrderr
routes.post('/order', authMiddleware, orderController.create);
routes.get('/order', authMiddleware, orderController.index);
routes.get('/order/:orderId', authMiddleware, orderController.indexOne);

//Projeto
// routes.get('/', authMiddleware, projectController.index);
routes.get('/projects', authMiddleware, projectController.index);
routes.get('/projects/:projectId', authMiddleware, projectController.show);
routes.post('/projects', authMiddleware, projectController.create);
routes.put('/projects/:projectId', authMiddleware, projectController.update);
routes.delete('/projects/:projectId', authMiddleware, projectController.delete);

module.exports = routes;

// TODO product, category
// TODO add product to category and add category to product model
