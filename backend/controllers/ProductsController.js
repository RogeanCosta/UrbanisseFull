// Configuração Básica
const { PrismaClient, Category } = require('../generated/prisma');
const prisma = new PrismaClient();

// Gerenciamento de rotas
exports.getProducts = async (req, res) => {
  try {
    const product = await prisma.products.findMany();
 
    res.status(200).json(product);

   } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
   }
};

exports.getProductsCamisa = async (req, res) => {
  try {
    const product = await prisma.products.findMany({
      where:{
        category: 'Camisas'
      }
    });
 
    res.status(200).json(product);

   } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
   }
};

exports.getProductsCalca = async (req, res) => {
  try {
    const product = await prisma.products.findMany({
      where:{
        category: 'Calças'
      }
    });
 
    res.status(200).json(product);

   } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
   }
};

exports.getProductsAcessorio = async (req, res) => {
  try {
    const product = await prisma.products.findMany({
      where:{
        category: 'Acessórios'
      }
    });
 
    res.status(200).json(product);

   } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
   }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.products.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).send('Produto deletado com sucesso!');
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
};
