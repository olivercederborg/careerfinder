/*
  Warnings:

  - Added the required column `name` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Discipline` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Area" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Discipline" ADD COLUMN     "name" TEXT NOT NULL;
