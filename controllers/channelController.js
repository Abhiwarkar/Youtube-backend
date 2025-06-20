const Channel = require('../models/Channel');
const User = require('../models/User');
const Video = require('../models/Video');

// @desc    Get all channels
// @route   GET /api/channels
// @access  Public
const getChannels = async (req, res) => {
  try {
    const { page = 1, limit = 12, search } = req.query;
    
    const query = { isActive: true };
    
    // Search functionality
    if (search) {
      query.$or = [
        { channelName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { handle: { $regex: search, $options: 'i' } }
      ];
    }

    const channels = await Channel.find(query)
      .populate('owner', 'username avatar')
      .sort('-subscriberCount')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Channel.countDocuments(query);

    res.status(200).json({
      success: true,
      count: channels.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      },
      data: channels
    });
  } catch (error) {
    console.error('Get channels error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching channels'
    });
  }
};

// @desc    Get single channel
// @route   GET /api/channels/:id
// @access  Public
const getChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id)
      .populate('owner', 'username avatar')
      .populate({
        path: 'videos',
        populate: {
          path: 'uploader',
          select: 'username avatar'
        },
        options: { sort: { createdAt: -1 } }
      });

    if (!channel) {
      return res.status(404).json({
        success: false,
        message: 'Channel not found'
      });
    }

    res.status(200).json({
      success: true,
      data: channel
    });
  } catch (error) {
    console.error('Get channel error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching channel'
    });
  }
};

// @desc    Create new channel
// @route   POST /api/channels
// @access  Private
// Fixed createChannel function in channelController.js

const createChannel = async (req, res) => {
  try {
    // ADD 'handle' to the destructuring!
    const { channelName, handle, description, category, avatar, banner } = req.body;

    // Check if handle is already taken
    const existingHandle = await Channel.findOne({ handle });
    if (existingHandle) {
      return res.status(400).json({
        success: false,
        message: 'Handle already taken. Please choose a different handle.'
      });
    }

    // Check if user already has a channel with this name
    const existingChannel = await Channel.findOne({
      owner: req.user.id,
      channelName
    });

    if (existingChannel) {
      return res.status(400).json({
        success: false,
        message: 'You already have a channel with this name'
      });
    }

    const channel = await Channel.create({
      channelName,
      handle, 
      description,
      category,
      avatar,
      banner,
      owner: req.user.id
    });

    // Add channel to user's channels array
    const user = await User.findById(req.user.id);
    user.channels.push(channel._id);
    await user.save();

    const populatedChannel = await Channel.findById(channel._id)
      .populate('owner', 'username avatar');

    res.status(201).json({
      success: true,
      message: 'Channel created successfully',
      data: populatedChannel
    });
  } catch (error) {
    console.error('Create channel error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating channel'
    });
  }
};
// @desc    Update channel
// @route   PUT /api/channels/:id
// @access  Private
const updateChannel = async (req, res) => {
  try {
    let channel = await Channel.findById(req.params.id);

    if (!channel) {
      return res.status(404).json({
        success: false,
        message: 'Channel not found'
      });
    }

    // Check if user owns the channel
    if (channel.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this channel'
      });
    }

    const { channelName, handle, description, category, avatar, banner } = req.body;

    channel = await Channel.findByIdAndUpdate(
      req.params.id,
      {
        channelName,
        description,
        category,
        avatar,
        banner
      },
      { new: true, runValidators: true }
    ).populate('owner', 'username avatar');

    res.status(200).json({
      success: true,
      message: 'Channel updated successfully',
      data: channel
    });
  } catch (error) {
    console.error('Update channel error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating channel'
    });
  }
};

// @desc    Delete channel
// @route   DELETE /api/channels/:id
// @access  Private
const deleteChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);

    if (!channel) {
      return res.status(404).json({
        success: false,
        message: 'Channel not found'
      });
    }

    // Check if user owns the channel
    if (channel.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this channel'
      });
    }

    // Delete all videos associated with this channel
    await Video.deleteMany({ channel: channel._id });

    // Remove channel from user's channels array
    const user = await User.findById(req.user.id);
    user.channels.pull(channel._id);
    await user.save();

    // Delete the channel
    await Channel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Channel and all associated videos deleted successfully'
    });
  } catch (error) {
    console.error('Delete channel error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting channel'
    });
  }
};

// @desc    Subscribe to channel
// @route   POST /api/channels/:id/subscribe
// @access  Private
const subscribeToChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (!channel) {
      return res.status(404).json({
        success: false,
        message: 'Channel not found'
      });
    }

    // Check if user is trying to subscribe to their own channel
    if (channel.owner.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot subscribe to your own channel'
      });
    }

    const isSubscribed = channel.subscribers.includes(req.user.id);

    if (isSubscribed) {
      // Unsubscribe
      channel.subscribers.pull(req.user.id);
      channel.subscriberCount -= 1;
      user.subscribedChannels.pull(channel._id);
    } else {
      // Subscribe
      channel.subscribers.push(req.user.id);
      channel.subscriberCount += 1;
      user.subscribedChannels.push(channel._id);
    }

    await channel.save();
    await user.save();

    res.status(200).json({
      success: true,
      message: isSubscribed ? 'Unsubscribed successfully' : 'Subscribed successfully',
      data: {
        isSubscribed: !isSubscribed,
        subscriberCount: channel.subscriberCount
      }
    });
  } catch (error) {
    console.error('Subscribe to channel error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while subscribing to channel'
    });
  }
};

// @desc    Get channel videos
// @route   GET /api/channels/:id/videos
// @access  Public
const getChannelVideos = async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    
    const channel = await Channel.findById(req.params.id);
    
    if (!channel) {
      return res.status(404).json({
        success: false,
        message: 'Channel not found'
      });
    }

    const videos = await Video.find({ 
      channel: req.params.id, 
      isPublic: true, 
      isActive: true 
    })
      .populate('uploader', 'username avatar')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Video.countDocuments({ 
      channel: req.params.id, 
      isPublic: true, 
      isActive: true 
    });

    res.status(200).json({
      success: true,
      count: videos.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      },
      data: videos
    });
  } catch (error) {
    console.error('Get channel videos error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching channel videos'
    });
  }
};

// @desc    Get user's channels
// @route   GET /api/channels/my-channels
// @access  Private
const getMyChannels = async (req, res) => {
  try {
    const channels = await Channel.find({ owner: req.user.id })
      .populate('owner', 'username avatar')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: channels.length,
      data: channels
    });
  } catch (error) {
    console.error('Get my channels error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching your channels'
    });
  }
};

module.exports = {
  getChannels,
  getChannel,
  createChannel,
  updateChannel,
  deleteChannel,
  subscribeToChannel,
  getChannelVideos,
  getMyChannels
};