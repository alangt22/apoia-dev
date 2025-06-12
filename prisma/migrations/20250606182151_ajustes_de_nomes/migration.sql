/*
  Warnings:

  - You are about to drop the column `connectedStriprAccountId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "connectedStriprAccountId",
ADD COLUMN     "connectedStripeAccountId" TEXT;
