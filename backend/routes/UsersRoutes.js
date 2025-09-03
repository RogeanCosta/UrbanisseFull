// Configuração Básica
const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

// Definição de rotas
// router.get('/', UsersController.list); 
// TODO: DEFINIR ROTAS RESTANTE.
router.delete('/users/:id', UsersController.deleteUser); // nome da função a ser alterada depois.
router.put('/users/:id', UsersController.updateUser);
// Exportação das rotas definidas
module.exports = router;
