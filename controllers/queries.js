const prisma = require('../lib/client');
const findPosts = async function (page, limit) {
  return await prisma.post.findMany({
    skip: (page - 1) * limit,
    take: Number(limit),
    select: {
      id: true,
      title: true, // Select specific fields from Post
      content: true,
      summary: true,
      image: true,
      author: {
        // Include the related author model
        select: {
          username: true, // Select specific fields from the author (Reader)
          email: true,
        },
      },
      comments: true,
    },
  });
};
const findUniquePost = async function (postid) {
  return await prisma.post.findUnique({
    where: { id: Number(postid) },
    select: {
      title: true,
      content: true,
      summary: true,
      image: true,
      author: {
        select: {
          username: true,
        },
      },
      comments: true,
    },
  });
};

const findComments = async function (postId) {
  return await prisma.comment.findMany({
    where: { postId: Number(postId) },
    select: {
      content: true,
      author: {
        select: { username: true },
      },
    },
  });
};

const createComment = async function (comment) {
  await prisma.comment.create({
    data: {
      content: comment.content,
      author: {
        connect: { id: comment.userId },
      },
      post: {
        connect: { id: comment.postId },
      },
    },
  });
};
const createPost = async function (post) {
  await prisma.post.create({
    data: {
      title: post.postTitle,
      content: post.postContent,
      summary: post.postSummary,
      author: {
        connect: { id: Number(post.postAuthorId) },
      },
    },
  });
};
const getTotalPosts = async function () {
  const totalPosts = await prisma.post.count();
  return totalPosts;
};
module.exports = {
  getTotalPosts,
  findPosts,
  findComments,
  findUniquePost,
  createPost,
  createComment,
};
