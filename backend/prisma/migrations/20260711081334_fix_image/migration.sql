/*
  Warnings:

  - You are about to drop the column `image_bytea` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `image_url` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "image_bytea",
ADD COLUMN     "image_url" TEXT NOT NULL;
