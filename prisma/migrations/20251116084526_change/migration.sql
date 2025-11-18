/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `directors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `engineers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "directors_firstName_lastName_key";

-- DropIndex
DROP INDEX "engineers_firstName_lastName_key";

-- CreateIndex
CREATE UNIQUE INDEX "directors_email_key" ON "directors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "engineers_email_key" ON "engineers"("email");
