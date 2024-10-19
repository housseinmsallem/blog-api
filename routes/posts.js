const express = require('express');
const router = express.Router();
const verifyToken = require('../controllers/jwtVerification');
const {
  findPosts,
  findComments,
  findUniquePost,
  createPost,
  createComment,
  getTotalPosts,
} = require('../controllers/queries');
//BLOG VIEWING

router.get('/', verifyToken, async (req, res, next) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const totalPosts = await getTotalPosts();
    console.log(totalPosts);
    const blog = await findPosts(page, limit);

    if (!blog) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const formattedBlogs = blog.map((blog) => ({
      id: blog.id,
      title: blog.title,
      content: blog.content,
      summary: blog.summary,
      author: {
        username: blog.author.username,
        email: blog.author.email,
      },
    }));
    res.json({ posts: formattedBlogs, totalPosts });
  } catch (error) {
    next(error);
  }
});
router.post('/', verifyToken, async (req, res, next) => {
  const postTitle = req.body.title;
  const postContent = req.body.content;
  const postAuthorId = req.body.userId;
  const postSummary = req.body.summary;
  console.log([postAuthorId, postTitle, postContent]);
  if (!postAuthorId) {
    console.error('Please log in to create a post');
    return res.status(401).json({ error: 'Authentication required' });
  }
  try {
    await createPost({ postTitle, postContent, postAuthorId, postSummary });
    res.json({
      message: 'Post created',
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:postid', verifyToken, async (req, res, next) => {
  const postid = req.params.postid;
  try {
    const post = await findUniquePost(postid);
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
    next(error);
  }
});
router.get('/:postid/comments', verifyToken, async (req, res, next) => {
  try {
    const postid = parseInt(req.params.postid);
    const comments = await findComments(postid);

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
router.post('/:postid/comments', verifyToken, async (req, res, next) => {
  const postId = parseInt(req.params.postid);
  const userId = parseInt(req.body.userId);
  const content = req.body.content;
  try {
    await createComment({ postId, userId, content });
    res.json({
      message: 'Comment',
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
