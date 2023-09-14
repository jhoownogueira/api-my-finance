/*
  Warnings:

  - Added the required column `expiresIn` to the `users_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users_tokens" ADD COLUMN     "expiresIn" TIMESTAMP(3) NOT NULL;
