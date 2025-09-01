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
