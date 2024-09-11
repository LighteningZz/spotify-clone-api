/*
  Warnings:

  - You are about to drop the column `bio` on the `Profiles` table. All the data in the column will be lost.
  - You are about to drop the column `dateofbirth` on the `Profiles` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profiles" DROP COLUMN "bio",
DROP COLUMN "dateofbirth",
DROP COLUMN "gender";
