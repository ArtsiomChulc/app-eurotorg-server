/*
  Warnings:

  - You are about to drop the column `marketName` on the `markets` table. All the data in the column will be lost.
  - Added the required column `marketNumber` to the `markets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "markets" DROP COLUMN "marketName",
ADD COLUMN     "marketNumber" TEXT NOT NULL;
