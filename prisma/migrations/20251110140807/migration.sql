/*
  Warnings:

  - You are about to drop the `Sito` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "city" TEXT,
ADD COLUMN     "postalCode" TEXT;

-- DropTable
DROP TABLE "Sito";
