/*
  Warnings:

  - You are about to drop the column `userId` on the `admins` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `admins` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `admins` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `admins` DROP FOREIGN KEY `admins_userId_fkey`;

-- AlterTable
ALTER TABLE `admins` DROP COLUMN `userId`,
    ADD COLUMN `user_id` VARCHAR(16) NOT NULL;

-- CreateTable
CREATE TABLE `articles` (
    `id` VARCHAR(16) NOT NULL,
    `author_id` VARCHAR(16) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `admins_user_id_key` ON `admins`(`user_id`);

-- AddForeignKey
ALTER TABLE `admins` ADD CONSTRAINT `admins_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `admins`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
