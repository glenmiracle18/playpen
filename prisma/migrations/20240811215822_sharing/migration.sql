/*
  Warnings:

  - You are about to drop the `FileSharing` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FileSharing" DROP CONSTRAINT "FileSharing_file_id_fkey";

-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "is_shared" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "FileSharing";

-- CreateTable
CREATE TABLE "ShareFolder" (
    "shared_folder_id" TEXT NOT NULL,
    "folder_id" TEXT NOT NULL,
    "shared_with_user_id" TEXT,
    "public_link" TEXT NOT NULL,
    "shared_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "access_level" "AccessLevel" NOT NULL,

    CONSTRAINT "ShareFolder_pkey" PRIMARY KEY ("shared_folder_id")
);

-- CreateTable
CREATE TABLE "ShareFile" (
    "share_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "shared_with_user_id" TEXT NOT NULL,
    "shared_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "access_level" "AccessLevel" NOT NULL,

    CONSTRAINT "ShareFile_pkey" PRIMARY KEY ("share_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShareFolder_public_link_key" ON "ShareFolder"("public_link");

-- AddForeignKey
ALTER TABLE "ShareFolder" ADD CONSTRAINT "ShareFolder_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "Folder"("folder_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareFile" ADD CONSTRAINT "ShareFile_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "File"("file_id") ON DELETE RESTRICT ON UPDATE CASCADE;
