-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lost" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "theme" TEXT NOT NULL DEFAULT E'light',
ADD COLUMN     "timesPlayed" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "won" INTEGER NOT NULL DEFAULT 0;
