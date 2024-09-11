-- CreateTable
CREATE TABLE "PlayLists" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "profilesId" UUID NOT NULL,

    CONSTRAINT "PlayLists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayListItems" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tracksId" UUID NOT NULL,
    "playListsId" UUID,

    CONSTRAINT "PlayListItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tracksId" UUID NOT NULL,
    "profilesId" UUID NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlayLists" ADD CONSTRAINT "PlayLists_profilesId_fkey" FOREIGN KEY ("profilesId") REFERENCES "Profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayListItems" ADD CONSTRAINT "PlayListItems_tracksId_fkey" FOREIGN KEY ("tracksId") REFERENCES "Tracks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayListItems" ADD CONSTRAINT "PlayListItems_playListsId_fkey" FOREIGN KEY ("playListsId") REFERENCES "PlayLists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_profilesId_fkey" FOREIGN KEY ("profilesId") REFERENCES "Profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_tracksId_fkey" FOREIGN KEY ("tracksId") REFERENCES "Tracks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
