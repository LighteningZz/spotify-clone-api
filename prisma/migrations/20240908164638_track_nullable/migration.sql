-- AlterTable
ALTER TABLE "Tracks" ADD COLUMN     "url" TEXT,
ALTER COLUMN "duration" DROP NOT NULL,
ALTER COLUMN "durationText" DROP NOT NULL;
