// Configuração Básica
const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

// Definição de rotas
<<<<<<< HEAD
// router.get('/', UsersController.list); 
// TODO: DEFINIR ROTAS RESTANTE.
router.delete('/users/:id', UsersController.deleteUser); // nome da função a ser alterada depois.
router.put('/users/:id', UsersController.updateUser);
=======
router.get('/users', UsersController.listUsers);
router.post('/users', UsersController.createUser);
router.delete('/users/:id', UsersController.deleteUser);
router.put('/users/:id', UsersController.updateUser);

>>>>>>> valnicio
// Exportação das rotas definidas
module.exports = router;