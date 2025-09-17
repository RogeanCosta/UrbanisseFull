// Configuração Básica
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const productsController = require('../controllers/ProductsController');

// Definição de rotas
router.get('/produtos', productsController.getProducts);
router.get('/produtos/camisas', productsController.getProductsCamisa);
router.get('/produtos/calcas', productsController.getProductsCalca);
router.get('/produtos/acessorios', productsController.getProductsAcessorio);
router.get('/produtos/:id', productsController.getProduct);
router.delete('/produtos/:id', productsController.deleteProduct); // nome da função pode ser alterada depois.

// Novas rotas
router.post(
  '/produtos',
  upload.single('file'),
  productsController.createProduct,
);
router.put('/produtos/:id', productsController.updateProduct);

// exportação das rotas definidas
module.exports = router;
