/*
  Warnings:

  - You are about to drop the column `accessToken` on the `users_tokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users_tokens" DROP COLUMN "accessToken";
