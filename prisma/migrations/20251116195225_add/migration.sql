-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ENGINEER', 'ADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';
