-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(16) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(320) NOT NULL,
    `password` TEXT NOT NULL,

    UNIQUE INDEX `users_id_key`(`id`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
