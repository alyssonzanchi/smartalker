-- DropIndex
DROP INDEX "User_businessId_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "admin" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "fullname" DROP NOT NULL;
