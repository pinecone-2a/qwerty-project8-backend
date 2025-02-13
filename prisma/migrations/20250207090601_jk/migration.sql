/*
  Warnings:

  - The primary key for the `BankCard` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `cardNumber` on the `BankCard` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - A unique constraint covering the columns `[cardNumber]` on the table `BankCard` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "BankCard" DROP CONSTRAINT "BankCard_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "cardNumber" SET DATA TYPE VARCHAR(20),
ADD CONSTRAINT "BankCard_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BankCard_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "BankCard_cardNumber_key" ON "BankCard"("cardNumber");
