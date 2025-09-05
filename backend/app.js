// Configuração Básica
const express = require('express');
const cors = require('cors');
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());

// Utilização de rotas
const productsRoutes = require('./routes/ProductsRoutes');
const usersRoutes = require('./routes/UsersRoutes');

app.use(productsRoutes);
app.use(usersRoutes);

// Inicialização do Servidor
app.listen(PORT, () => {
  console.log('Servidor executando na porta ' + PORT);
}); //
 //