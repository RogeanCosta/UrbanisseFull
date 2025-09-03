// Configuração Básica
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// Gerenciamento de rotas
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
        imagePath,
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

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
        imagePath,
      },
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o produto!' });
  }
};