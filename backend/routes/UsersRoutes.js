// Configuração Básica
const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");

// Definição de rotas
router.delete("/users/:id", UsersController.deleteUser); // nome da função a ser alterada depois.
router.put("/users/:id", UsersController.updateUser);
router.get("/users", UsersController.listUsers);
router.post("/users", UsersController.createUser);
router.delete("/users/:id", UsersController.deleteUser);
router.put("/users/:id", UsersController.updateUser);

module.exports = router;
