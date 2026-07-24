-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MENS', 'WOMENS', 'UNISEX');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'UNISEX';
