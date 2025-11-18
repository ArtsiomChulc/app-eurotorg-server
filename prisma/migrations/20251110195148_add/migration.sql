-- CreateTable
CREATE TABLE "handbook" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "market_number" TEXT NOT NULL,
    "market_address" TEXT NOT NULL,
    "responsible" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "handbook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "handbook_market_number_key" ON "handbook"("market_number");
