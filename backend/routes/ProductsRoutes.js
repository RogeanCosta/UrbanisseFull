// Configuração Básica
const express = require("express");
const router = express.Router();
const productsController = require("../controllers/ProductsController");

// Definição de rotas
router.get("/produtos", productsController.getProducts);
router.get("/produtos/camisas", productsController.getProductsCamisa);
router.get("/produtos/calcas", productsController.getProductsCalca);
router.get("/produtos/acessorios", productsController.getProductsAcessorio);
router.delete("/produtos/:id", productsController.deleteProduct); // nome da função pode ser alterada depois.
router.post("/produtos", productsController.createProduct);
router.put("/produtos/:id", productsController.updateProduct);

// TODO: DEFINIR RESTANTE DAS ROTAS...

// exportação das rotas definidas
module.exports = router;
