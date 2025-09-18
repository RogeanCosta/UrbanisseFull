// Configuração Básica
const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

// Definição de rotas
router.get('/users', UsersController.listUsers);
router.get('/users/:id', UsersController.listUser);
router.post('/users', UsersController.createUser);
router.delete('/users/:id', UsersController.deleteUser);
router.put('/users/:id', UsersController.updateUser);
router.post('/login', UsersController.loginUser);

// app.post('/login',

module.exports = router;
