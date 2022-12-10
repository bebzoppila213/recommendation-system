-- CreateTable
CREATE TABLE `_FilmToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FilmToUser_AB_unique`(`A`, `B`),
    INDEX `_FilmToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_FilmToUser` ADD CONSTRAINT `_FilmToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Film`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FilmToUser` ADD CONSTRAINT `_FilmToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
