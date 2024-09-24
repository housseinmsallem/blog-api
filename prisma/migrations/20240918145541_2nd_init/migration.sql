/*
  Warnings:

  - You are about to drop the `Blog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BlogToComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BlogToPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CommentToPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CommentToReader` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostToReader` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BlogToComment" DROP CONSTRAINT "_BlogToComment_A_fkey";

-- DropForeignKey
ALTER TABLE "_BlogToComment" DROP CONSTRAINT "_BlogToComment_B_fkey";

-- DropForeignKey
ALTER TABLE "_BlogToPost" DROP CONSTRAINT "_BlogToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_BlogToPost" DROP CONSTRAINT "_BlogToPost_B_fkey";

-- DropForeignKey
ALTER TABLE "_CommentToPost" DROP CONSTRAINT "_CommentToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommentToPost" DROP CONSTRAINT "_CommentToPost_B_fkey";

-- DropForeignKey
ALTER TABLE "_CommentToReader" DROP CONSTRAINT "_CommentToReader_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommentToReader" DROP CONSTRAINT "_CommentToReader_B_fkey";

-- DropForeignKey
ALTER TABLE "_PostToReader" DROP CONSTRAINT "_PostToReader_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostToReader" DROP CONSTRAINT "_PostToReader_B_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "postId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "authorId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Blog";

-- DropTable
DROP TABLE "_BlogToComment";

-- DropTable
DROP TABLE "_BlogToPost";

-- DropTable
DROP TABLE "_CommentToPost";

-- DropTable
DROP TABLE "_CommentToReader";

-- DropTable
DROP TABLE "_PostToReader";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Reader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Reader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
