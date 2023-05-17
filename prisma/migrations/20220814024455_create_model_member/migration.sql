/*
  Warnings:

  - You are about to alter the column `created_at` on the `articles` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `articles` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `articles` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE `members` (
    `id` VARCHAR(16) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(320) NOT NULL,
    `gender` VARCHAR(50) NOT NULL,
    `age` INTEGER NOT NULL,
    `address` TEXT NOT NULL,
    `social_media` TEXT NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `admin_id` VARCHAR(16) NULL,
    `accepted_at` TIMESTAMP NULL,

    UNIQUE INDEX `members_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `members` ADD CONSTRAINT `members_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
