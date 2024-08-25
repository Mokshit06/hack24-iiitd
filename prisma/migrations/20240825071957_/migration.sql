/*
  Warnings:

  - You are about to drop the `Progress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Topic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SubjectToTopic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_topicId_fkey";

-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_user_id_fkey";

-- DropForeignKey
ALTER TABLE "_SubjectToTopic" DROP CONSTRAINT "_SubjectToTopic_A_fkey";

-- DropForeignKey
ALTER TABLE "_SubjectToTopic" DROP CONSTRAINT "_SubjectToTopic_B_fkey";

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "topics" TEXT[];

-- DropTable
DROP TABLE "Progress";

-- DropTable
DROP TABLE "Topic";

-- DropTable
DROP TABLE "_SubjectToTopic";
