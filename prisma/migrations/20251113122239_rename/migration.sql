/*
  Warnings:

  - You are about to drop the column `district` on the `handbook` table. All the data in the column will be lost.
  - Added the required column `director` to the `handbook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "handbook" DROP COLUMN "district",
ADD COLUMN     "director" TEXT NOT NULL;
