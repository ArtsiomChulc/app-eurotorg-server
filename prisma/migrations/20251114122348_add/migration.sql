/*
  Warnings:

  - Added the required column `region` to the `markets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "markets" ADD COLUMN     "region" TEXT NOT NULL;
