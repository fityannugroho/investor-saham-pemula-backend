/*
  Warnings:

  - You are about to drop the column `user_id` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `author_id` on the `articles` table. All the data in the column will be lost.
  - You are about to alter the column `created_at` on the `articles` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `articles` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `admins` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `writer` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `admins` DROP FOREIGN KEY `admins_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `articles` DROP FOREIGN KEY `articles_author_id_fkey`;

-- AlterTable
ALTER TABLE `admins` DROP COLUMN `user_id`,
    ADD COLUMN `email` VARCHAR(320) NOT NULL,
    ADD COLUMN `name` VARCHAR(255) NOT NULL,
    ADD COLUMN `password` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `articles` DROP COLUMN `author_id`,
    ADD COLUMN `photo` VARCHAR(255) NULL,
    ADD COLUMN `writer` VARCHAR(255) NOT NULL,
    MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `authentications` (
    `id` VARCHAR(16) NOT NULL,
    `token` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `admins_email_key` ON `admins`(`email`);

-- AddForeignKey
ALTER TABLE `authentications` ADD CONSTRAINT `authentications_id_fkey` FOREIGN KEY (`id`) REFERENCES `admins`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
