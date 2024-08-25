/*
  Warnings:

  - You are about to drop the `_ClassToSubject` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `classid` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `name` on the `Subject` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SubjectEnum" AS ENUM ('MATHS', 'SCIENCE', 'ENGLISH', 'SOCIAL_STUDIES', 'MORAL_VALUES');

-- DropForeignKey
ALTER TABLE "_ClassToSubject" DROP CONSTRAINT "_ClassToSubject_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToSubject" DROP CONSTRAINT "_ClassToSubject_B_fkey";

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "classid" TEXT NOT NULL,
DROP COLUMN "name",
ADD COLUMN     "name" "SubjectEnum" NOT NULL;

-- DropTable
DROP TABLE "_ClassToSubject";

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_classid_fkey" FOREIGN KEY ("classid") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
