## 📝 Modelos do Banco de Dados (Prisma)

Abaixo encontram-se os modelos definidos no arquivo `schema.prisma`:

```prisma
enum Category {
  Acessórios
  Calçados
  Calças
  Camisas
  Intimo
}

enum Gender {
  feminino
  masculino
  Unissex
}

model products {
  id              BigInt   @id @default(autoincrement())
  name            String
  price           Float
  description     String?
  stock           Int
  category        Category
  gender          Gender
  imageUrl        String
  imagePath       String
}

model users {
  id              Int      @id @default(autoincrement())
  name            String
  email           String   @unique
  phone           String
  password        String
}
```

## 📝 Documentação da API

Toda a documentação detalhada da API está disponível no seguinte arquivo, no Google Docs. Inclui exemplos de requisições, respostas e descrição de uso.

[![Abrir documentação da API](https://img.shields.io/badge/Documentação-Google%20Docs-white?logo=google-docs&logoColor=blue&style=for-the-badge)](https://docs.google.com/document/d/1_nIHfzuZf2arNeqd-1CxS8-B2iXftAKzF0P6z5pc_t8/edit?usp=sharing)
