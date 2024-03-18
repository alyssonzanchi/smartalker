/*
  Warnings:

  - Added the required column `expireAt` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "expireAt" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Ativo';
