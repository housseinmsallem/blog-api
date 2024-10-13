const prisma = require('../lib/client');
const findPosts = async function () {
  return await prisma.post.findMany({
    select: {
      id: true,
      title: true, // Select specific fields from Post
      content: true,
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

const createPost = async function (post) {
  await prisma.post.create({
    data: {
      title: post.postTitle,
      content: post.postContent,
      author: {
        connect: { id: Number(post.postAuthorId) },
      },
    },
  });
};
module.exports = { findPosts, findComments, findUniquePost, createPost };
