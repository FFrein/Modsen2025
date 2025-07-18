/*
  Warnings:

  - The values [user,creator] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `password` to the `UserRecords` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `UserRecords` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'ORGANIZER');
ALTER TABLE "Users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropIndex
DROP INDEX "UserRecords_meetupId_userId_key";

-- AlterTable
ALTER TABLE "UserRecords" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;
