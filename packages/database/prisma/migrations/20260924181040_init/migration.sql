-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('PROJECT', 'NOTE', 'EXPERIMENT');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "number" INTEGER,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "PostType" NOT NULL,
    "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
    "tags" TEXT[],
    "content" TEXT NOT NULL,
    "learnedTitle" TEXT NOT NULL,
    "learnedContent" TEXT NOT NULL,
    "repositoryUrl" TEXT,
    "liveUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE INDEX "Post_type_status_idx" ON "Post"("type", "status");

-- CreateIndex
CREATE INDEX "Post_status_position_idx" ON "Post"("status", "position");

-- CreateIndex
CREATE INDEX "Post_status_featured_idx" ON "Post"("status", "featured");
