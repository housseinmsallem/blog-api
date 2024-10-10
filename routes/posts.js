const express = require('express');
const router = express.Router();
const verifyToken = require('../controllers/jwtVerification');
const jwt = require('jsonwebtoken');
const {
  findPosts,
  findComments,
  findUniquePost,
  createPost,
} = require('../controllers/queries');
//BLOG VIEWING

router.get('/', verifyToken, async (req, res, next) => {
  try {
    const blog = await findPosts();

    if (!blog) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const formattedBlogs = blog.map((blog) => ({
      title: blog.title,
      content: blog.content,
      author: {
        username: blog.author.username,
        email: blog.author.email,
      },
    }));
    res.json(formattedBlogs);
  } catch (error) {
    next(error); // Pass any error to the error handling middleware
  }
});
router.post('/', verifyToken, async (req, res, next) => {
  const postTitle = req.body.title;
  const postContent = req.body.content;
  const postAuthorId = req.body.userId;
  console.log([postAuthorId, postTitle, postContent]);
  if (!postAuthorId) {
    console.error('Please log in to create a post');
    return res.status(401).json({ error: 'Authentication required' });
  }
  try {
    await createPost({ postTitle, postContent, postAuthorId });
    res.json({
      message: 'Post created',
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:postId', async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await findUniquePost(postId);
    console.log(post);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({
      title: post.title,
      content: post.content,
      author: {
        username: post.author.username,
        email: post.author.email,
      },
      comments: post.comments,
    });
  } catch (error) {
    next(error); // Pass any error to the error handling middleware
  }
});
router.get('/:postId/comments', async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId); // Convert postId to an integer
    const comments = await findComments(postId);

    if (comments.length === 0) {
      return res.status(404).json({ error: 'No comments found for this post' });
    }
    const formattedComments = comments.map((comment) => ({
      content: comment.content,
      author: { username: comment.author.username },
    }));
    res.json(formattedComments);
  } catch (error) {
    next(error);
  }
});
router.post('/:postId/comments', async (req, res, next) => {
  const postId = parseInt(req.params.postId);
  const authorId = req.user.id;
  try {
    await prisma.comments.create({
      data: {
        authorId: authorId,
        postId: postId,
        content: req.body.content,
      },
    });
  } catch (err) {
    return next(err);
  }
});

//BLOG CREATION

module.exports = router;
