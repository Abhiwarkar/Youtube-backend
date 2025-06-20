const express = require('express');
const {
  getVideos,
  getVideo,
  createVideo,
  updateVideo,
  deleteVideo,
  likeVideo,
  dislikeVideo,
  getTrendingVideos
} = require('../controllers/VideoController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// GET /api/videos/trending - MUST come before /:id route
router.get('/trending', getTrendingVideos);

// GET /api/videos and POST /api/videos
router.route('/')
  .get(getVideos)
  .post(protect, createVideo);

// GET /api/videos/:id, PUT /api/videos/:id, DELETE /api/videos/:id
router.route('/:id')
  .get(getVideo)
  .put(protect, updateVideo)
  .delete(protect, deleteVideo);

// POST /api/videos/:id/like and POST /api/videos/:id/dislike
router.post('/:id/like', protect, likeVideo);
router.post('/:id/dislike', protect, dislikeVideo);

module.exports = router;