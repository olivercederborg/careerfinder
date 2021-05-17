/*
  Warnings:

  - You are about to drop the column `disciplineId` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToRole" DROP CONSTRAINT "_CategoryToRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToRole" DROP CONSTRAINT "_CategoryToRole_B_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_disciplineId_fkey";

-- AlterTable
ALTER TABLE "Area" ADD COLUMN     "disciplineId" INTEGER;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "disciplineId";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "_CategoryToRole";

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "roleId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Job" ADD FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Area" ADD FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE SET NULL ON UPDATE CASCADE;
