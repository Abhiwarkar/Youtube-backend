const Comment = require('../models/Comment');
const Video = require('../models/Video');
const User = require('../models/User');

// @desc    Get comments for a video
// @route   GET /api/comments/video/:videoId
// @access  Public
const getVideoComments = async (req, res) => {
  try {
    const { videoId } = req.params;
    console.log('Getting comments for video:', videoId);
    
    // ✅ ONLY search by videoId string field (not ObjectId)
    const comments = await Comment.find({ 
      videoId: videoId, // Use string field only
      isActive: { $ne: false }
    })
    .populate('author', 'username avatar')
    .sort('-createdAt')
    .exec();

    console.log(`Found ${comments.length} comments for video ${videoId}`);

    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments
    });
  } catch (error) {
    console.error('Get video comments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching comments'
    });
  }
};

// @desc    Add comment to video
// @route   POST /api/comments
// @access  Private
const addComment = async (req, res) => {
  try {
    const { text, videoId } = req.body;

    console.log('=== ADD COMMENT DEBUG ===');
    console.log('Request body:', req.body);
    console.log('Request user:', req.user);
    console.log('User ID available:', req.user ? req.user.id : 'NO USER');

    // Check user first
    if (!req.user) {
      console.log('❌ No user object in request');
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    if (!req.user.id && !req.user._id) {
      console.log('❌ No user ID in user object:', req.user);
      return res.status(401).json({
        success: false,
        message: 'User ID missing'
      });
    }

    // Validate input
    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Comment text is required'
      });
    }

    if (!videoId) {
      return res.status(400).json({
        success: false,
        message: 'Video ID is required'
      });
    }

    // Create comment with string videoId
    const commentData = {
      text: text.trim(),
      author: req.user.id || req.user._id,
      videoId: videoId // Store as string
    };

    console.log('Creating comment with data:', commentData);

    const comment = await Comment.create(commentData);
    console.log('✅ Comment created:', comment._id);

    // Populate and return comment
    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'username avatar');

    console.log('✅ Comment populated:', populatedComment);

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: populatedComment
    });

  } catch (error) {
    console.error('❌ ADD COMMENT ERROR:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding comment',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
const updateComment = async (req, res) => {
  try {
    const { text } = req.body;
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    if (comment.author.toString() !== req.user.id && comment.author.toString() !== req.user._id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    comment.text = text.trim();
    comment.isEdited = true;
    comment.editedAt = Date.now();
    await comment.save();

    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'username avatar');

    res.status(200).json({
      success: true,
      data: populatedComment
    });
  } catch (error) {
    console.error('UPDATE COMMENT ERROR:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating comment'
    });
  }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    if (comment.author.toString() !== req.user.id && comment.author.toString() !== req.user._id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    console.error('DELETE COMMENT ERROR:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting comment'
    });
  }
};

// @desc    Like/Unlike comment
// @route   POST /api/comments/:id/like
// @access  Private
const likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    if (!comment.likes) comment.likes = [];

    const userId = req.user.id || req.user._id;
    const isLiked = comment.likes.includes(userId);

    if (isLiked) {
      comment.likes.pull(userId);
      comment.likeCount = Math.max((comment.likeCount || 1) - 1, 0);
    } else {
      comment.likes.push(userId);
      comment.likeCount = (comment.likeCount || 0) + 1;
    }

    await comment.save();

    res.status(200).json({
      success: true,
      data: {
        isLiked: !isLiked,
        likeCount: comment.likeCount
      }
    });
  } catch (error) {
    console.error('LIKE COMMENT ERROR:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while liking comment'
    });
  }
};

module.exports = {
  getVideoComments,
  addComment,
  updateComment,
  deleteComment,
  likeComment
};