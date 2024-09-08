/*
  Warnings:

  - Added the required column `durationText` to the `Tracks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tracks" ADD COLUMN     "durationText" TEXT NOT NULL;
