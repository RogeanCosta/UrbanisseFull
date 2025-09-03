// Configuração Básica
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/ProductsController');

// Definição de rotas
router.get('/produtos', productsController.getProducts);
router.get('/produtos/camisas', productsController.getProdutctsCamisa);
router.get('/produtos/calcas', productsController.getProdutctsCalca);
router.get('/produtos/acessorios', productsController.getProdutctsAcessorio);
router.delete('/produtos/:id', productsController.deleteProduct); // nome da função pode ser alterada depois.
// TODO: DEFINIR RESTANTE DAS ROTAS...

// exportação das rotas definidas
module.exports = router;
