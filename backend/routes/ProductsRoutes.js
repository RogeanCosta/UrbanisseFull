// Configuração Básica
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/ProductsController');

// Definição de rotas
router.delete('/produtos/:id', productsController.deleteProduct); // nome da função pode ser alterada depois.
// TODO: DEFINIR RESTANTE DAS ROTAS...

// exportação das rotas definidas
module.exports = router;
