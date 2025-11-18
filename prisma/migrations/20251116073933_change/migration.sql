/*
  Warnings:

  - You are about to drop the column `user_id` on the `markets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "markets" DROP CONSTRAINT "markets_user_id_fkey";

-- AlterTable
ALTER TABLE "markets" DROP COLUMN "user_id";
