const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Channel = require('../models/Channel');
const Video = require('../models/Video');
const Comment = require('../models/Comment');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('📦 MongoDB Connected for seeding');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany();
    await Channel.deleteMany();
    await Video.deleteMany();
    await Comment.deleteMany();
    console.log('✅ Cleared existing data');

    // Create users
    console.log('👥 Creating users...');
    
    
       const users = await User.create([
      {
        username: 'codemaster',
        email: 'codemaster@example.com',
        password: 'password123', 
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      {
        username: 'devtips',
        email: 'devtips@example.com',
        password: 'password123', 
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      {
        username: 'fullstackacademy',
        email: 'fullstack@example.com',
        password: 'password123', 
        avatar: 'https://i.pravatar.cc/150?img=3'
      }
    ]);
    console.log('✅ Created users');

    // Create channels
    console.log('📺 Creating channels...');
    const channels = await Channel.create([
      {
        channelName: 'CodeMaster',
        handle: 'codemaster',
        description: 'Learn programming with practical examples and real-world projects.',
        owner: users[0]._id,
        avatar: 'https://i.pravatar.cc/150?img=1',
        category: 'Technology',
        subscriberCount: 245000
      },
      {
        channelName: 'DevTips',
        handle: 'devtips',
        description: 'Web development tutorials and tips for modern developers.',
        owner: users[1]._id,
        avatar: 'https://i.pravatar.cc/150?img=2',
        category: 'Education',
        subscriberCount: 156000
      },
      {
        channelName: 'FullStack Academy',
        handle: 'fullstackacademy',
        description: 'Complete courses on full-stack development and programming.',
        owner: users[2]._id,
        avatar: 'https://i.pravatar.cc/150?img=3',
        category: 'Technology',
        subscriberCount: 89000
      }
    ]);
    console.log('✅ Created channels');

    // Create videos
    console.log('🎥 Creating videos...');
    const videos = await Video.create([
      {
        title: 'Learn React in 15 Minutes - Complete Beginner Guide',
        description: 'A comprehensive guide to getting started with React. Learn components, state, props, and more in this beginner-friendly tutorial.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnailUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
        duration: '15:30',
        views: 152000,
        likeCount: 3400,
        dislikeCount: 45,
        category: 'Technology',
        tags: ['react', 'javascript', 'tutorial', 'beginners'],
        channel: channels[0]._id,
        uploader: users[0]._id
      },
      {
        title: 'MongoDB Crash Course - Build 5 Projects',
        description: 'Master MongoDB by building 5 real-world projects. Learn NoSQL database design, queries, and best practices.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnailUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
        duration: '1:35:20',
        views: 79000,
        likeCount: 2100,
        dislikeCount: 32,
        category: 'Education',
        tags: ['mongodb', 'database', 'nodejs', 'projects'],
        channel: channels[1]._id,
        uploader: users[1]._id
      },
      {
        title: 'What Is GraphQL? - Database Query Language Explained',
        description: 'Understanding GraphQL and how it differs from REST APIs. Learn when and why to use GraphQL in your projects.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumbnailUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
        duration: '38:20',
        views: 112000,
        likeCount: 2800,
        dislikeCount: 28,
        category: 'Technology',
        tags: ['graphql', 'api', 'database', 'web development'],
        channel: channels[2]._id,
        uploader: users[2]._id
      },
      {
        title: 'CSS Grid vs Flexbox - Complete Guide',
        description: 'When to use CSS Grid vs Flexbox? Learn the differences and see practical examples of both layout systems.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        thumbnailUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
        duration: '28:30',
        views: 68000,
        likeCount: 1900,
        dislikeCount: 15,
        category: 'Education',
        tags: ['css', 'grid', 'flexbox', 'layout', 'design'],
        channel: channels[0]._id,
        uploader: users[0]._id
      },
      {
        title: 'AWS Cloud Computing Fundamentals',
        description: 'Get started with Amazon Web Services. Learn about EC2, S3, RDS, and other core AWS services.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        thumbnailUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg',
        duration: '3:22:45',
        views: 198000,
        likeCount: 4200,
        dislikeCount: 67,
        category: 'Technology',
        tags: ['aws', 'cloud', 'computing', 'devops'],
        channel: channels[1]._id,
        uploader: users[1]._id
      },
      {
        title: 'JavaScript ES6 Features You Must Know',
        description: 'Master modern JavaScript with ES6 features: arrow functions, destructuring, modules, and more.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        thumbnailUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg',
        duration: '45:20',
        views: 245000,
        likeCount: 5800,
        dislikeCount: 92,
        category: 'Technology',
        tags: ['javascript', 'es6', 'modern js', 'programming'],
        channel: channels[2]._id,
        uploader: users[2]._id
      }
    ]);
    console.log('✅ Created videos');

    // Update channels with video references
    console.log('🔗 Updating channel references...');
    await Channel.findByIdAndUpdate(channels[0]._id, {
      videos: [videos[0]._id, videos[3]._id],
      videoCount: 2,
      totalViews: videos[0].views + videos[3].views
    });

    await Channel.findByIdAndUpdate(channels[1]._id, {
      videos: [videos[1]._id, videos[4]._id],
      videoCount: 2,
      totalViews: videos[1].views + videos[4].views
    });

    await Channel.findByIdAndUpdate(channels[2]._id, {
      videos: [videos[2]._id, videos[5]._id],
      videoCount: 2,
      totalViews: videos[2].views + videos[5].views
    });

    // Update users with channel references
    await User.findByIdAndUpdate(users[0]._id, {
      channels: [channels[0]._id]
    });

    await User.findByIdAndUpdate(users[1]._id, {
      channels: [channels[1]._id]
    });

    await User.findByIdAndUpdate(users[2]._id, {
      channels: [channels[2]._id]
    });

    // Create sample comments
    console.log('💬 Creating comments...');
    const comments = await Comment.create([
      {
        text: 'Great tutorial! Really helped me understand React concepts.',
        author: users[1]._id,
        video: videos[0]._id
      },
      {
        text: 'Thanks for this comprehensive guide. Very well explained!',
        author: users[2]._id,
        video: videos[0]._id
      },
      {
        text: 'MongoDB is so powerful! This tutorial covers everything I needed.',
        author: users[0]._id,
        video: videos[1]._id
      },
      {
        text: 'GraphQL vs REST finally makes sense. Excellent explanation!',
        author: users[1]._id,
        video: videos[2]._id
      }
    ]);

    // Update videos with comment references
    await Video.findByIdAndUpdate(videos[0]._id, {
      comments: [comments[0]._id, comments[1]._id],
      commentCount: 2
    });

    await Video.findByIdAndUpdate(videos[1]._id, {
      comments: [comments[2]._id],
      commentCount: 1
    });

    await Video.findByIdAndUpdate(videos[2]._id, {
      comments: [comments[3]._id],
      commentCount: 1
    });

    console.log('✅ Created comments');
    console.log('🎉 Database seeded successfully!');
    console.log('');
    console.log('📊 Summary:');
    console.log(`- Users: ${users.length}`);
    console.log(`- Channels: ${channels.length}`);
    console.log(`- Videos: ${videos.length}`);
    console.log(`- Comments: ${comments.length}`);
    console.log('');
    console.log('🔑 Test Credentials:');
    console.log('Email: codemaster@example.com | Password: password123');
    console.log('Email: devtips@example.com | Password: password123');
    console.log('Email: fullstack@example.com | Password: password123');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

connectDB().then(() => seedDatabase());