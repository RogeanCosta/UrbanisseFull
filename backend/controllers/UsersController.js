// Configuração Básica
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// Gerenciamento de rotas
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.users.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).send('Usuário deletado com sucesso!');
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o usuário!' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const { name, email, phone, password } = req.body;

    const user = await prisma.users.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        email,
        phone,
        password,
      },
    });
    res.status(200).send('Usuário atualizado com sucesso!');
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o usuário!' });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os usuários' });
  }
};

exports.listUser = async (req, res) => {
  const { id } = req.params;

  try {
    const users = await prisma.users.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os usuários' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        phone,
        password,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Usuário já cadastrado!' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Retorna status de falha caso algumas das informações estiverem faltando.
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Email e senhas são obrigatórios!' });
  }

  try {
    // Tentando encontrar usuário por email para verificar se senha está correta
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Credenciais Inválidas!' });
    }

    // Comparando a senha informada com a senha armazenada.
    const isMatch = user.password === password;

    // Caso a senha esteja errada, retorna status de falha.
    if (!isMatch) {
      return res.status(401).json({ message: 'Senha errada.' });
    }

    // Caso a senha esteja correta, há sucesso no login!
    res.status(200).json({
      message: 'Login bem sucedido!',
      user: {
        id: user.id, // no momento, só precisamos do id de usuário.
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
