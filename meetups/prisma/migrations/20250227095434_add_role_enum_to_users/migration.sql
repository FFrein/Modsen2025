/*
  Warnings:

  - Added the required column `role` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'creator');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role" "Role" NOT NULL;
