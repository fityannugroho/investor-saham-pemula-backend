/*
  Warnings:

  - You are about to alter the column `created_at` on the `articles` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `articles` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `started_at` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the `applicants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `applications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `article_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ebooks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `applicants` DROP FOREIGN KEY `applicants_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `applications` DROP FOREIGN KEY `applications_applicant_id_fkey`;

-- AlterTable
ALTER TABLE `articles` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `events` MODIFY `started_at` TIMESTAMP NOT NULL;

-- DropTable
DROP TABLE `applicants`;

-- DropTable
DROP TABLE `applications`;

-- DropTable
DROP TABLE `article_tags`;

-- DropTable
DROP TABLE `ebooks`;

-- DropTable
DROP TABLE `users`;
