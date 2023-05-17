/*
  Warnings:

  - You are about to alter the column `created_at` on the `articles` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `articles` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `created_at` on the `members` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `members` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `accepted_at` on the `members` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `articles` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `members` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    MODIFY `accepted_at` TIMESTAMP NULL;

-- CreateTable
CREATE TABLE `registrants` (
    `id` VARCHAR(16) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(320) NOT NULL,
    `id_card` VARCHAR(255) NOT NULL,
    `cv` VARCHAR(255) NULL,

    UNIQUE INDEX `registrants_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `branches` (
    `id` VARCHAR(16) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `email` VARCHAR(320) NOT NULL,
    `social_media` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `registrant_id` VARCHAR(16) NULL,
    `admin_id` VARCHAR(16) NULL,
    `accepted_at` TIMESTAMP NULL,

    UNIQUE INDEX `branches_email_key`(`email`),
    UNIQUE INDEX `branches_registrant_id_key`(`registrant_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `branches` ADD CONSTRAINT `branches_registrant_id_fkey` FOREIGN KEY (`registrant_id`) REFERENCES `registrants`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `branches` ADD CONSTRAINT `branches_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
