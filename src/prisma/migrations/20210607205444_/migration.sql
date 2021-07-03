/*
  Warnings:

  - You are about to drop the column `disciplineId` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `Job` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Area" DROP CONSTRAINT "Area_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_roleId_fkey";

-- AlterTable
ALTER TABLE "Area" DROP COLUMN "disciplineId";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "roleId";

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "disciplineId" INTEGER,
ADD COLUMN     "jobId" INTEGER;

-- AddForeignKey
ALTER TABLE "Role" ADD FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;
