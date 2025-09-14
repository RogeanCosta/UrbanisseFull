// Configuração Básica
const { PrismaClient, Category, Gender } = require('../generated/prisma');
const prisma = new PrismaClient();
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { s3 } = require('../s3'); // seu arquivo de configuração do S3

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const REGION = process.env.AWS_REGION;



// ==================== LISTAGEM ====================

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



// ==================== DELETAR PRODUTO ====================
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



// ==================== CRIAR PRODUTO ====================

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, stock, category, gender } = req.body;
    const file = req.file;

    console.log(req.body);  // Deve exibir os outros campos
    console.log(req.file);

    if (!file) {
      return res.status(400).json({ error: 'Arquivo de imagem é obrigatório' });
    }

    // Nome único para o arquivo no bucket
    const s3Key = `products/${Date.now()}-${file.originalname}`;

    // Upload para o S3
    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: s3Key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    // URL pública
    const imageUrl = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${s3Key}`;

    const newProduct = await prisma.products.create({
      data: {
        name,
        price: parseFloat(price),
        description,
        stock: parseFloat(stock),
        category,
        gender,
        imageUrl,
        imagePath: s3Key
      }
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.log(req.file);  // Deve exibir o buffer do arquivo
    console.log(req.body);  // Deve exibir os outros campos
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o produto!' });
  }
};



// ==================== ATUALIZAR PRODUTO ====================

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