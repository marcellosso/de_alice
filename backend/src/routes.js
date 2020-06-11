const express = require('express');
const routes = express.Router();

const authController = require('./app/controllers/authController');
const addressController = require('./app/controllers/addressController');
const projectController = require('./app/controllers/projectController');

// require('./app/controllers/index');

const authMiddleware = require('./app/middlewares/auth');

//Usuario
routes.post('/register', authController.create);
routes.post('/authenticate', authController.auth);
routes.get('/users', authMiddleware, authController.index);
routes.put('/update', authMiddleware, authController.update);
routes.post('/forgot_password', authController.forgotPassword);
routes.post('/reset_password', authController.resetPassword);
routes.post('/user', authMiddleware, authController.indexOne);

//Endereço
routes.post('/address', authMiddleware, addressController.create);
routes.get('/address', authMiddleware, authController.getUserAddress);

//Geral
routes.get('/', authMiddleware, projectController.index);

module.exports = routes;

// TODO product, category
// TODO add product to category and add category to product model
