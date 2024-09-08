/*
  Warnings:

  - A unique constraint covering the columns `[name,artistsId]` on the table `Albums` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Artists` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,artistsId,albumId]` on the table `Tracks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Albums` table without a default value. This is not possible if the table is not empty.
  - Added the required column `artistsId` to the `Tracks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Albums" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tracks" ADD COLUMN     "artistsId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Albums_name_artistsId_key" ON "Albums"("name", "artistsId");

-- CreateIndex
CREATE UNIQUE INDEX "Artists_name_key" ON "Artists"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tracks_title_artistsId_albumId_key" ON "Tracks"("title", "artistsId", "albumId");

-- AddForeignKey
ALTER TABLE "Tracks" ADD CONSTRAINT "Tracks_artistsId_fkey" FOREIGN KEY ("artistsId") REFERENCES "Artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
