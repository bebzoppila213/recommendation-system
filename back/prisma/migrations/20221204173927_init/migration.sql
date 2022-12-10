-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Film` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `homepage` VARCHAR(191) NULL DEFAULT '',
    `budget` VARCHAR(191) NOT NULL,
    `imdb_id` VARCHAR(191) NOT NULL,
    `popularity` DOUBLE NOT NULL,
    `poster_path` TEXT NOT NULL,
    `production_companies` TEXT NOT NULL,
    `production_countries` TEXT NOT NULL,
    `release_date` VARCHAR(191) NOT NULL,
    `revenue` DOUBLE NOT NULL,
    `runtime` DOUBLE NULL DEFAULT 0,
    `status` VARCHAR(191) NULL DEFAULT '',
    `vote_average` DOUBLE NOT NULL,
    `vote_count` DOUBLE NOT NULL,
    `ru_title` VARCHAR(191) NOT NULL,
    `ru_overview` TEXT NULL,

    FULLTEXT INDEX `Film_ru_title_idx`(`ru_title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genres` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FilmCluster` (
    `filmId` INTEGER NOT NULL,
    `clasterId` INTEGER NOT NULL,

    UNIQUE INDEX `FilmCluster_filmId_key`(`filmId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FilmToGenres` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FilmToGenres_AB_unique`(`A`, `B`),
    INDEX `_FilmToGenres_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_FilmToGenres` ADD CONSTRAINT `_FilmToGenres_A_fkey` FOREIGN KEY (`A`) REFERENCES `Film`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FilmToGenres` ADD CONSTRAINT `_FilmToGenres_B_fkey` FOREIGN KEY (`B`) REFERENCES `Genres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
