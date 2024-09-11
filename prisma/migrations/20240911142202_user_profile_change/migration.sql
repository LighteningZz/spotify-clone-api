/*
  Warnings:

  - You are about to drop the column `name` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profiles" ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "name";
