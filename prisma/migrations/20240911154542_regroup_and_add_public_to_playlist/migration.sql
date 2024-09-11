/*
  Warnings:

  - You are about to drop the column `profilesId` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `profilesId` on the `PlayLists` table. All the data in the column will be lost.
  - You are about to drop the `UserPlayList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_profilesId_fkey";

-- DropForeignKey
ALTER TABLE "PlayLists" DROP CONSTRAINT "PlayLists_profilesId_fkey";

-- DropForeignKey
ALTER TABLE "UserPlayList" DROP CONSTRAINT "UserPlayList_userId_fkey";

-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "profilesId",
ADD COLUMN     "usersId" UUID;

-- AlterTable
ALTER TABLE "PlayLists" DROP COLUMN "profilesId",
ADD COLUMN     "public" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "usersId" UUID;

-- DropTable
DROP TABLE "UserPlayList";

-- AddForeignKey
ALTER TABLE "PlayLists" ADD CONSTRAINT "PlayLists_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
