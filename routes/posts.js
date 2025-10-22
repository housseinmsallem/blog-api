const express = require('express');
const router = express.Router();
const verifyToken = require('../controllers/jwtVerification');
const {
  getPosts,
  getPostById,
  getPostComments,
  createPostComment,
} = require('../controllers/postsController');
//BLOG VIEWING

router.get('/');
router.post('/', verifyToken, getPosts);
router.get('/:postid', verifyToken, getPostById);
router.get('/:postid/comments', verifyToken, getPostComments);
router.post('/:postid/comments', verifyToken, createPostComment);

module.exports = router;
