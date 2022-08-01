/*
  Warnings:

  - You are about to alter the column `created_at` on the `articles` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `articles` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `started_at` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `articles` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `events` MODIFY `started_at` TIMESTAMP NOT NULL;

-- CreateTable
CREATE TABLE `ebooks` (
    `id` VARCHAR(16) NOT NULL,
    `article_id` VARCHAR(16) NOT NULL,
    `file_name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `ebooks_article_id_key`(`article_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ebooks` ADD CONSTRAINT `ebooks_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
