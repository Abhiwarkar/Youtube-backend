const Video = require('../models/Video');
const Channel = require('../models/Channel');
const User = require('../models/User');

// @desc    Get all videos
// @route   GET /api/videos
// @access  Public
const getVideos = async (req, res) => {
  try {
    const { page = 1, limit = 12, category, search, sort = '-createdAt' } = req.query;
    
    const query = { isPublic: true, isActive: true };
    
    // Filter by category
    if (category && category !== 'All') {
      query.category = category;
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const videos = await Video.find(query)
      .populate('channel', 'channelName handle avatar')
      .populate('uploader', 'username avatar')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Video.countDocuments(query);

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
    console.error('Get videos error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching videos'
    });
  }
};

// @desc    Get single video
// @route   GET /api/videos/:id
// @access  Public
const getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate('channel', 'channelName handle avatar subscriberCount')
      .populate('uploader', 'username avatar')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'username avatar'
        }
      });

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    // Increment view count
    video.views += 1;
    await video.save();

    res.status(200).json({
      success: true,
      data: video
    });
  } catch (error) {
    console.error('Get video error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching video'
    });
  }
};

// @desc    Create new video
// @route   POST /api/videos
// @access  Private
const createVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, duration, category, tags, channelId } = req.body;

    // Check if channel exists and user owns it
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({
        success: false,
        message: 'Channel not found'
      });
    }

    if (channel.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to upload to this channel'
      });
    }

    const video = await Video.create({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      duration,
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      channel: channelId,
      uploader: req.user.id
    });

    // Add video to channel
    channel.videos.push(video._id);
    channel.videoCount += 1;
    await channel.save();

    const populatedVideo = await Video.findById(video._id)
      .populate('channel', 'channelName handle avatar')
      .populate('uploader', 'username avatar');

    res.status(201).json({
      success: true,
      message: 'Video uploaded successfully',
      data: populatedVideo
    });
  } catch (error) {
    console.error('Create video error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating video'
    });
  }
};

// @desc    Update video
// @route   PUT /api/videos/:id
// @access  Private
const updateVideo = async (req, res) => {
  try {
    let video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    // Check if user owns the video
    if (video.uploader.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this video'
      });
    }

    const { title, description, thumbnailUrl, category, tags } = req.body;

    video = await Video.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        thumbnailUrl,
        category,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : video.tags
      },
      { new: true, runValidators: true }
    ).populate('channel', 'channelName handle avatar')
     .populate('uploader', 'username avatar');

    res.status(200).json({
      success: true,
      message: 'Video updated successfully',
      data: video
    });
  } catch (error) {
    console.error('Update video error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating video'
    });
  }
};

// @desc    Delete video
// @route   DELETE /api/videos/:id
// @access  Private
const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    // Check if user owns the video
    if (video.uploader.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this video'
      });
    }

    // Remove video from channel
    const channel = await Channel.findById(video.channel);
    if (channel) {
      channel.videos.pull(video._id);
      channel.videoCount -= 1;
      await channel.save();
    }

    await Video.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Video deleted successfully'
    });
  } catch (error) {
    console.error('Delete video error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting video'
    });
  }
};

// @desc    Like/Unlike video
// @route   POST /api/videos/:id/like
// @access  Private
const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    const isLiked = video.likes.includes(req.user.id);
    const isDisliked = video.dislikes.includes(req.user.id);

    if (isLiked) {
      // Unlike the video
      video.likes.pull(req.user.id);
      video.likeCount -= 1;
      user.likedVideos.pull(video._id);
    } else {
      // Like the video
      video.likes.push(req.user.id);
      video.likeCount += 1;
      user.likedVideos.push(video._id);

      // Remove from dislikes if exists
      if (isDisliked) {
        video.dislikes.pull(req.user.id);
        video.dislikeCount -= 1;
        user.dislikedVideos.pull(video._id);
      }
    }

    await video.save();
    await user.save();

    res.status(200).json({
      success: true,
      message: isLiked ? 'Video unliked' : 'Video liked',
      data: {
        isLiked: !isLiked,
        likeCount: video.likeCount,
        dislikeCount: video.dislikeCount
      }
    });
  } catch (error) {
    console.error('Like video error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while liking video'
    });
  }
};

// @desc    Dislike/Remove dislike video
// @route   POST /api/videos/:id/dislike
// @access  Private
const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    const isLiked = video.likes.includes(req.user.id);
    const isDisliked = video.dislikes.includes(req.user.id);

    if (isDisliked) {
      // Remove dislike
      video.dislikes.pull(req.user.id);
      video.dislikeCount -= 1;
      user.dislikedVideos.pull(video._id);
    } else {
      // Dislike the video
      video.dislikes.push(req.user.id);
      video.dislikeCount += 1;
      user.dislikedVideos.push(video._id);

      // Remove from likes if exists
      if (isLiked) {
        video.likes.pull(req.user.id);
        video.likeCount -= 1;
        user.likedVideos.pull(video._id);
      }
    }

    await video.save();
    await user.save();

    res.status(200).json({
      success: true,
      message: isDisliked ? 'Dislike removed' : 'Video disliked',
      data: {
        isDisliked: !isDisliked,
        likeCount: video.likeCount,
        dislikeCount: video.dislikeCount
      }
    });
  } catch (error) {
    console.error('Dislike video error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while disliking video'
    });
  }
};

// @desc    Get trending videos
// @route   GET /api/videos/trending
// @access  Public
const getTrendingVideos = async (req, res) => {
  try {
    const videos = await Video.find({ isPublic: true, isActive: true })
      .populate('channel', 'channelName handle avatar')
      .populate('uploader', 'username avatar')
      .sort({ views: -1, likeCount: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: videos.length,
      data: videos
    });
  } catch (error) {
    console.error('Get trending videos error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching trending videos'
    });
  }
};

module.exports = {
  getVideos,
  getVideo,
  createVideo,
  updateVideo,
  deleteVideo,
  likeVideo,
  dislikeVideo,
  getTrendingVideos
};