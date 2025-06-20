const express = require('express');
const {
  getChannels,
  getChannel,
  createChannel,
  updateChannel,
  deleteChannel,
  subscribeToChannel,
  getChannelVideos,
  getMyChannels
} = require('../controllers/channelController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getChannels)
  .post(protect, createChannel);

router.get('/my-channels', protect, getMyChannels);

router.route('/:id')
  .get(getChannel)
  .put(protect, updateChannel)
  .delete(protect, deleteChannel);

router.post('/:id/subscribe', protect, subscribeToChannel);
router.get('/:id/videos', getChannelVideos);

module.exports = router;