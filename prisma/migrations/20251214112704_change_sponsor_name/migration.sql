/*
  Warnings:

  - You are about to drop the `Sponsors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sponsors" DROP CONSTRAINT "Sponsors_sponsorTierId_fkey";

-- DropTable
DROP TABLE "Sponsors";

-- CreateTable
CREATE TABLE "Sponsor" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "sponsorTierId" INTEGER NOT NULL,

    CONSTRAINT "Sponsor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sponsor_name_key" ON "Sponsor"("name");

-- AddForeignKey
ALTER TABLE "Sponsor" ADD CONSTRAINT "Sponsor_sponsorTierId_fkey" FOREIGN KEY ("sponsorTierId") REFERENCES "SponsorTier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
