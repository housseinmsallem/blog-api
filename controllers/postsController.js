const { findComments, createComment } = require('./queries');
export async function getPosts(req, res, next) {
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
      image: blog.image,
      author: {
        username: blog.author.username,
        email: blog.author.email,
      },
    }));
    res.json({ posts: formattedBlogs, totalPosts });
  } catch (error) {
    next(error);
  }
}
export async function getPostById(req, res, next) {
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
}
export async function getPostComments(req, res, next) {
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
}
export async function createPostComment(req, res, next) {
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
}
