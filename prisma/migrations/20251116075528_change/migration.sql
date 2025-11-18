/*
  Warnings:

  - A unique constraint covering the columns `[firstName,lastName]` on the table `directors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[firstName,lastName]` on the table `engineers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "directors_firstName_lastName_key" ON "directors"("firstName", "lastName");

-- CreateIndex
CREATE UNIQUE INDEX "engineers_firstName_lastName_key" ON "engineers"("firstName", "lastName");
