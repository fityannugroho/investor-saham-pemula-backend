/*
  Warnings:

  - You are about to drop the column `article_id` on the `article_tags` table. All the data in the column will be lost.
  - You are about to drop the column `author_id` on the `articles` table. All the data in the column will be lost.
  - You are about to alter the column `created_at` on the `articles` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `articles` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `article_id` on the `ebooks` table. All the data in the column will be lost.
  - You are about to drop the column `article_id` on the `events` table. All the data in the column will be lost.
  - You are about to alter the column `started_at` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `writer` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `article_tags` DROP FOREIGN KEY `article_tags_article_id_fkey`;

-- DropForeignKey
ALTER TABLE `articles` DROP FOREIGN KEY `articles_author_id_fkey`;

-- DropForeignKey
ALTER TABLE `ebooks` DROP FOREIGN KEY `ebooks_article_id_fkey`;

-- DropForeignKey
ALTER TABLE `events` DROP FOREIGN KEY `events_article_id_fkey`;

-- AlterTable
ALTER TABLE `article_tags` DROP COLUMN `article_id`;

-- AlterTable
ALTER TABLE `articles` DROP COLUMN `author_id`,
    ADD COLUMN `photo` VARCHAR(255) NULL,
    ADD COLUMN `writer` VARCHAR(255) NOT NULL,
    MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `ebooks` DROP COLUMN `article_id`;

-- AlterTable
ALTER TABLE `events` DROP COLUMN `article_id`,
    MODIFY `started_at` TIMESTAMP NOT NULL;
