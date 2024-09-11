/*
  Warnings:

  - You are about to drop the `Profiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_profilesId_fkey";

-- DropForeignKey
ALTER TABLE "PlayLists" DROP CONSTRAINT "PlayLists_profilesId_fkey";

-- DropForeignKey
ALTER TABLE "Profiles" DROP CONSTRAINT "Profiles_userId_fkey";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT;

-- DropTable
DROP TABLE "Profiles";

-- DropEnum
DROP TYPE "Gender";

-- CreateTable
CREATE TABLE "UserPlayList" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,

    CONSTRAINT "UserPlayList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPlayList_userId_key" ON "UserPlayList"("userId");

-- AddForeignKey
ALTER TABLE "UserPlayList" ADD CONSTRAINT "UserPlayList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayLists" ADD CONSTRAINT "PlayLists_profilesId_fkey" FOREIGN KEY ("profilesId") REFERENCES "UserPlayList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_profilesId_fkey" FOREIGN KEY ("profilesId") REFERENCES "UserPlayList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
