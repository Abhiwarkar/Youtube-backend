const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
  channelName: {
    type: String,
    required: [true, 'Please add a channel name'],
    trim: true,
    maxlength: [100, 'Channel name cannot exceed 100 characters']
  },
  handle: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  avatar: {
    type: String,
    default: 'https://via.placeholder.com/150x150?text=Channel'
  },
  banner: {
    type: String,
    default: 'https://via.placeholder.com/1280x720?text=Channel+Banner'
  },
  subscribers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  subscriberCount: {
    type: Number,
    default: 0
  },
  videos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video'
  }],
  videoCount: {
    type: Number,
    default: 0
  },
  totalViews: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    enum: [
      'Technology', 'Education', 'Entertainment', 'Gaming', 
      'Music', 'Sports', 'News', 'Comedy', 'Film & Animation',
      'Autos & Vehicles', 'Pets & Animals', 'Travel & Events',
      'Howto & Style', 'Science & Technology', 'Nonprofits & Activism',
      'People & Blogs'
    ],
    default: 'Entertainment'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create handle from channel name
channelSchema.pre('save', function(next) {
  if (this.isModified('channelName') && !this.handle) {
    this.handle = this.channelName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 30);
  }
  next();
});

module.exports = mongoose.model('Channel', channelSchema);