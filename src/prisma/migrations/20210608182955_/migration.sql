/*
  Warnings:

  - You are about to drop the column `areaId` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `disciplineId` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `jobId` on the `Role` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_areaId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_jobId_fkey";

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "disciplineId" INTEGER,
ADD COLUMN     "areaId" INTEGER,
ADD COLUMN     "roleId" INTEGER;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "areaId",
DROP COLUMN "disciplineId",
DROP COLUMN "jobId";

-- AddForeignKey
ALTER TABLE "Job" ADD FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
