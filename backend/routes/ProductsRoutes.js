// Configuração Básica
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/ProductsController');

// Definição de rotas
<<<<<<< HEAD
router.get('/produtos', productsController.getProducts);
router.get('/produtos/camisas', productsController.getProdutctsCamisa);
router.get('/produtos/calcas', productsController.getProdutctsCalca);
router.get('/produtos/acessorios', productsController.getProdutctsAcessorio);
router.delete('/produtos/:id', productsController.deleteProduct); // nome da função pode ser alterada depois.
// TODO: DEFINIR RESTANTE DAS ROTAS...
=======
router.delete('/produtos/:id', productsController.deleteProduct);

// Novas rotas
router.post("/produtos", productsController.createProduct);
router.put("/produtos/:id", productsController.updateProduct);
>>>>>>> valnicio

// exportação das rotas definidas
module.exports = router;