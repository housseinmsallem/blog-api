-- CreateTable
CREATE TABLE "Reader" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,

    CONSTRAINT "Reader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostToReader" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CommentToReader" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CommentToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BlogToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BlogToComment" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Reader_email_key" ON "Reader"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Reader_username_key" ON "Reader"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToReader_AB_unique" ON "_PostToReader"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToReader_B_index" ON "_PostToReader"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CommentToReader_AB_unique" ON "_CommentToReader"("A", "B");

-- CreateIndex
CREATE INDEX "_CommentToReader_B_index" ON "_CommentToReader"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CommentToPost_AB_unique" ON "_CommentToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_CommentToPost_B_index" ON "_CommentToPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BlogToPost_AB_unique" ON "_BlogToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_BlogToPost_B_index" ON "_BlogToPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BlogToComment_AB_unique" ON "_BlogToComment"("A", "B");

-- CreateIndex
CREATE INDEX "_BlogToComment_B_index" ON "_BlogToComment"("B");

-- AddForeignKey
ALTER TABLE "_PostToReader" ADD CONSTRAINT "_PostToReader_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToReader" ADD CONSTRAINT "_PostToReader_B_fkey" FOREIGN KEY ("B") REFERENCES "Reader"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentToReader" ADD CONSTRAINT "_CommentToReader_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentToReader" ADD CONSTRAINT "_CommentToReader_B_fkey" FOREIGN KEY ("B") REFERENCES "Reader"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentToPost" ADD CONSTRAINT "_CommentToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentToPost" ADD CONSTRAINT "_CommentToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogToPost" ADD CONSTRAINT "_BlogToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogToPost" ADD CONSTRAINT "_BlogToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogToComment" ADD CONSTRAINT "_BlogToComment_A_fkey" FOREIGN KEY ("A") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogToComment" ADD CONSTRAINT "_BlogToComment_B_fkey" FOREIGN KEY ("B") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
