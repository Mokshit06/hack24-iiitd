/*
  Warnings:

  - You are about to drop the column `assignmentId` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the `Assignments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AssignmentsToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `topicId` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Assignments" DROP CONSTRAINT "Assignments_class_id_fkey";

-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "_AssignmentsToUser" DROP CONSTRAINT "_AssignmentsToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_AssignmentsToUser" DROP CONSTRAINT "_AssignmentsToUser_B_fkey";

-- AlterTable
ALTER TABLE "Progress" DROP COLUMN "assignmentId",
ADD COLUMN     "topicId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Assignments";

-- DropTable
DROP TABLE "_AssignmentsToUser";

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClassToSubject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SubjectToTopic" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClassToSubject_AB_unique" ON "_ClassToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassToSubject_B_index" ON "_ClassToSubject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SubjectToTopic_AB_unique" ON "_SubjectToTopic"("A", "B");

-- CreateIndex
CREATE INDEX "_SubjectToTopic_B_index" ON "_SubjectToTopic"("B");

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToSubject" ADD CONSTRAINT "_ClassToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToSubject" ADD CONSTRAINT "_ClassToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectToTopic" ADD CONSTRAINT "_SubjectToTopic_A_fkey" FOREIGN KEY ("A") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectToTopic" ADD CONSTRAINT "_SubjectToTopic_B_fkey" FOREIGN KEY ("B") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
