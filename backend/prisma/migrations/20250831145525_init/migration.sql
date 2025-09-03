-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('Acessórios', 'Calçados', 'Calças', 'Camisas', 'Intimo');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('feminino', 'masculino', 'Unissex');

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "stock" INTEGER NOT NULL,
    "category" "public"."Category" NOT NULL,
    "gender" "public"."Gender" NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);