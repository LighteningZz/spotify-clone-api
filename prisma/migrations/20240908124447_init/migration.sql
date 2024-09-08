-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'NonBinary', 'Other', 'NotSpecified');

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profiles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "bio" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "dateofbirth" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artists" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Albums" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "artistsId" UUID NOT NULL,

    CONSTRAINT "Albums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tracks" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "duration" DECIMAL(65,30) NOT NULL,
    "albumId" UUID NOT NULL,

    CONSTRAINT "Tracks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_userId_key" ON "Profiles"("userId");

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Albums" ADD CONSTRAINT "Albums_artistsId_fkey" FOREIGN KEY ("artistsId") REFERENCES "Artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tracks" ADD CONSTRAINT "Tracks_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Albums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
