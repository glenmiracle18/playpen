/*
  Warnings:

  - You are about to drop the column `public_link` on the `ShareFolder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[public_id]` on the table `ShareFolder` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `public_id` to the `ShareFolder` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ShareFolder_public_link_key";

-- AlterTable
ALTER TABLE "ShareFolder" DROP COLUMN "public_link",
ADD COLUMN     "public_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ShareFolder_public_id_key" ON "ShareFolder"("public_id");
