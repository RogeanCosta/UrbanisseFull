// Configuração Básica
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// Gerenciamento de rotas
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.users.delete({
      where: {
        id: parseInt(id)
      },
    });

    res.status(200).send('Usuário deletado com sucesso!');
    }
  catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o usuário!' });
  }
}

exports.updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const {name, email, phone, password} = req.body;

    const user = await prisma.users.update({
      where: {
        id: parseInt(id)
      },
      data: {
        name,
        email,
        phone,
        password
      }
    });
    
    res.status(200).send('Usuário atualizado com sucesso!');
    }
  catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o usuário!' });
  }
}