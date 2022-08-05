/*
  Warnings:

  - You are about to drop the column `user_id` on the `admins` table. All the data in the column will be lost.
  - You are about to alter the column `created_at` on the `articles` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `articles` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `started_at` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - A unique constraint covering the columns `[email]` on the table `admins` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `admins` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `admins` DROP FOREIGN KEY `admins_user_id_fkey`;

-- AlterTable
ALTER TABLE `admins` DROP COLUMN `user_id`,
    ADD COLUMN `email` VARCHAR(320) NOT NULL,
    ADD COLUMN `name` VARCHAR(255) NOT NULL,
    ADD COLUMN `password` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `articles` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `events` MODIFY `started_at` TIMESTAMP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `admins_email_key` ON `admins`(`email`);
