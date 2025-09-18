// Configuração Básica
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const productsController = require('../controllers/ProductsController');

// ROTAS GET
router.get('/produtos', productsController.getProducts);
router.get('/produtos/camisas', productsController.getProductsCamisa);
router.get('/produtos/calcas', productsController.getProductsCalca);
router.get('/produtos/acessorios', productsController.getProductsAcessorio);

router.get('/produtos/intimas', productsController.getProductsIntimas);
router.get('/produtos/calcados', productsController.getProductsCalcados);
router.get('/produtos/stock/:stock', productsController.getProductsByStock);
router.get('/produtos/gender/:gender', productsController.getProductsByGender);

router.get('/produtos/:id', productsController.getProduct);

// ROTAS DELETE
router.delete('/produtos/:id', productsController.deleteProduct); // nome da função pode ser alterada depois.

// ROTAS POST
router.post(
  '/produtos',
  upload.single('file'),
  productsController.createProduct,
);

// ROTAS PUT
router.put('/produtos/:id', productsController.updateProduct);

// exportação das rotas definidas
module.exports = router;
