/*
  Warnings:

  - You are about to drop the column `description_zh` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Catalog" ADD COLUMN     "imageData" BYTEA,
ADD COLUMN     "imageMimeType" TEXT,
ADD COLUMN     "pdfData" BYTEA,
ADD COLUMN     "pdfMimeType" TEXT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "description_zh",
ADD COLUMN     "specs_zh" JSONB;

-- AlterTable
ALTER TABLE "ProductImage" ADD COLUMN     "data" BYTEA,
ADD COLUMN     "mimeType" TEXT;
