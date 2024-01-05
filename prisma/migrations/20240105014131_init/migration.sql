/*
  Warnings:

  - You are about to drop the column `password` on the `user_auth_verifications` table. All the data in the column will be lost.
  - Added the required column `code` to the `user_auth_verifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_auth_verifications" DROP COLUMN "password",
ADD COLUMN     "code" VARCHAR(100) NOT NULL;
