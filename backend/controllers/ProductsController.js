// Configuração Básica
const { PrismaClient, Category, Gender } = require('../generated/prisma');
const prisma = new PrismaClient();

// Gerenciamento de rotas
exports.getProducts = async (req, res) => {
  try {
    const product = await prisma.products.findMany();
 
    res.status(200).json(product);

   } catch (error) {
    res.status(404).json({ error: 'Erro ao buscar produtos' });
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
    res.status(404).json({ error: 'Erro ao buscar produtos' });
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
    res.status(404).json({ error: 'Erro ao buscar produtos' });
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
    res.status(404).json({ error: 'Erro ao buscar produtos' });
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

// Nova rota para criar um produto
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, stock, category, gender, imageUrl, imagePath } = req.body;
    const newProduct = await prisma.products.create({
      data: {
        name,
        price,
        description,
        stock,
        category,
        gender,
        imageUrl,
        imagePath
      }
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o produto!' });
  }
};

// Nova rota para atualizar um produto
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, price, description, stock, category, gender, imageUrl, imagePath } = req.body;
    const updatedProduct = await prisma.products.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        price,
        description,
        stock,
        category,
        gender,
        imageUrl,
        imagePath
      }
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o produto!' });
  }
};