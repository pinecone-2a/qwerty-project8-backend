/*
  Warnings:

  - Added the required column `CVC` to the `BankCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankCard" ADD COLUMN     "CVC" INTEGER NOT NULL;
