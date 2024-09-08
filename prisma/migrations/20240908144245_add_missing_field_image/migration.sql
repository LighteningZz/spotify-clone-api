/*
  Warnings:

  - Added the required column `image` to the `Albums` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Tracks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Albums" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tracks" ADD COLUMN     "image" TEXT NOT NULL;
