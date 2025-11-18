/*
  Warnings:

  - You are about to drop the column `status` on the `markets` table. All the data in the column will be lost.
  - You are about to drop the `handbook` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "HeatingType" AS ENUM ('ELECTRO', 'CENTRAL', 'PEAT', 'PELLET', 'GAS', 'NO');

-- CreateEnum
CREATE TYPE "SewerageType" AS ENUM ('CENTRAL', 'SEPTIC_TANK', 'NO');

-- CreateEnum
CREATE TYPE "WaterSupply" AS ENUM ('YES', 'NO');

-- AlterTable
ALTER TABLE "markets" DROP COLUMN "status",
ADD COLUMN     "director_id" INTEGER,
ADD COLUMN     "engineer_id" INTEGER,
ADD COLUMN     "operating_mode" TEXT;

-- DropTable
DROP TABLE "public"."handbook";

-- CreateTable
CREATE TABLE "directors" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "directors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "engineers" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "engineers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_networks" (
    "id" SERIAL NOT NULL,
    "heating" "HeatingType" NOT NULL,
    "sewerage" "SewerageType" NOT NULL,
    "waterSupply" "WaterSupply" NOT NULL,
    "installed_capacity" TEXT NOT NULL,
    "existing_capacity" TEXT NOT NULL,
    "market_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "store_networks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meter_numbers" (
    "id" SERIAL NOT NULL,
    "nomination" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "market_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meter_numbers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "store_networks_market_id_key" ON "store_networks"("market_id");

-- AddForeignKey
ALTER TABLE "markets" ADD CONSTRAINT "markets_director_id_fkey" FOREIGN KEY ("director_id") REFERENCES "directors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "markets" ADD CONSTRAINT "markets_engineer_id_fkey" FOREIGN KEY ("engineer_id") REFERENCES "engineers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_networks" ADD CONSTRAINT "store_networks_market_id_fkey" FOREIGN KEY ("market_id") REFERENCES "markets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meter_numbers" ADD CONSTRAINT "meter_numbers_market_id_fkey" FOREIGN KEY ("market_id") REFERENCES "markets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
