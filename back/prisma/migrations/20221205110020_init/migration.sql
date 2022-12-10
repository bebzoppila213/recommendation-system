/*
  Warnings:

  - You are about to alter the column `release_date` on the `film` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `film` MODIFY `release_date` DATETIME(3) NOT NULL;
