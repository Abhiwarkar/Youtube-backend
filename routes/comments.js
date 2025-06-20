const express = require('express');
const {
  getVideoComments,
  addComment,
  updateComment,
  deleteComment,
  likeComment
} = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// GET /api/comments/video/:videoId - specific route first
router.get('/video/:videoId', getVideoComments);

// POST /api/comments
router.post('/', protect, addComment);

// PUT /api/comments/:id and DELETE /api/comments/:id
router.route('/:id')
  .put(protect, updateComment)
  .delete(protect, deleteComment);

// POST /api/comments/:id/like
router.post('/:id/like', protect, likeComment);

module.exports = router;