/*
  Warnings:

  - You are about to alter the column `created_at` on the `articles` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `articles` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `adminId` on the `authentications` table. All the data in the column will be lost.
  - You are about to alter the column `started_at` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `authentications` DROP FOREIGN KEY `Authentications_adminId_fkey`;

-- AlterTable
ALTER TABLE `articles` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `authentications` DROP COLUMN `adminId`;

-- AlterTable
ALTER TABLE `events` MODIFY `started_at` TIMESTAMP NOT NULL;

-- AddForeignKey
ALTER TABLE `Authentications` ADD CONSTRAINT `Authentications_id_fkey` FOREIGN KEY (`id`) REFERENCES `admins`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
