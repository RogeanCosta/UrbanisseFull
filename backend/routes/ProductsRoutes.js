// Configuração Básica
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/ProductsController');

// Definição de rotas
router.get('/produtos', productsController.getProducts);
router.get('/produtos/camisas', productsController.getProductsCamisa);
router.get('/produtos/calcas', productsController.getProductsCalca);
router.get('/produtos/acessorios', productsController.getProductsAcessorio);
router.delete('/produtos/:id', productsController.deleteProduct);
// Novas rotas
router.post('/produtos', productsController.createProduct);
router.put('/produtos/:id', productsController.updateProduct);

// exportação das rotas definidas
module.exports = router;