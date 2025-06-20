# YouTube Clone - MERN Stack

A fully responsive YouTube clone built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring video browsing, user authentication, channel management, and comment system.

Frontend Github
-- https://github.com/Abhiwarkar/Youtube-frontend
Backend Github
--https://github.com/Abhiwarkar/Youtube-backend

## 📋 Features

### Frontend (React + Vite)
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Video Gallery**: Grid layout with 12 sample videos
- **Search & Filter**: Search videos by title and filter by categories
- **User Authentication**: Sign up, sign in with JWT tokens
- **Video Player**: Embedded YouTube videos with like/dislike functionality
- **Comment System**: Add, edit, delete comments on videos
- **Channel Management**: Create and manage personal channels
- **Modern UI**: Clean, YouTube-inspired interface with Tailwind CSS
- **Fast Development**: Lightning-fast HMR and build times with Vite

### Backend (Node.js & Express) - Ready for Implementation
- RESTful API design
- JWT authentication
- MongoDB data modeling
- Video and user management
- Comment system APIs

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
```bash
Frontend --git clone https://github.com/Abhiwarkar/Youtube-frontend
cd Youtube-frontend

Backend --
git clone https://github.com/Abhiwarkar/Youtube-backend
cd Youtube-backend

```


2. **Install all dependencies**
```bash
npm run install-all
```

3. **Start development servers**
```bash
npm run dev  --For backend
npm run dev -- for frontend (Vite)
```

This will start:
- Frontend: http://localhost:3000 (Vite dev server)
- Backend: http://localhost:5000 


## 📁 Project Structure

```
Frontend folder structure--
FRONTEND/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── AuthModal.js
│   │   ├── ChannelForm.js
│   │   ├── CommentSection.js
│   │   ├── Header.js
│   │   ├── Sidebar.js
│   │   ├── VideoCard.js
│   │   └── VideoPlayer.js
│   ├── context/
│   ├── data/
│   │   └── mockData.js
│   ├── hooks/
│   │   ├── useApi.js
│   │   └── useAuth.js
│   ├── pages/
│   │   ├── ChannelPage.js
│   │   ├── HomePage.js
│   │   ├── ProfilePage.js
│   │   └── VideoPage.js
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── helpers.js
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .env
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.cjs
├── README.md
├── tailwind.config.cjs
└── vite.config.js

Backend folder structure
BACKEND/
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   ├── channelController.js
│   ├── commentController.js
│   └── VideoController.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── models/
│   ├── Channel.js
│   ├── Comment.js
│   ├── User.js
│   └── Video.js
├── node_modules/
├── routes/
│   ├── auth.js
│   ├── channels.js
│   ├── comments.js
│   └── videos.js
├── seedData/
│   └── seedDatabase.js
├── utils/
│   └── generateToken.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
└── server.js
```


## 🎯 Current Implementation Status


### ✅ Completed (Frontend)
- ✅ Responsive header with search functionality
- ✅ Collapsible sidebar navigation
- ✅ Video grid with 12 sample videos
- ✅ Category filtering (Technology, Education, Design, etc.)
- ✅ Video search functionality
- ✅ User authentication (sign up/sign in)
- ✅ Video player page with embedded videos
- ✅ Like/dislike functionality
- ✅ Comment system (add, edit, delete)
- ✅ Channel creation and management
- ✅ User profile management
- ✅ Mobile-responsive design
- ✅ Mock data integration
- ✅ Migrated from CRA to Vite for faster builds

### ✅ Completed (Backend)
- ✅ MongoDB database setup
- ✅ Express.js API routes
- ✅ JWT authentication middleware
- ✅ Video upload functionality
- ✅ Real-time comment updates
- ✅ User subscription system
- ✅ Video analytics
- ✅ RESTful API design
- ✅ Input validation and sanitization
- ✅ Error handling middleware
- ✅ File upload with Cloudinary
- ✅ Password hashing with bcrypt
- ✅ CORS and security middleware
- ✅ Rate limiting protection
- ✅ Database models and schemas

### 🚀 Ready for Production
- ✅ Complete MERN stack application
- ✅ Frontend-Backend integration
- ✅ Database connectivity
- ✅ Authentication system
- ✅ Video management system
- ✅ Comment system
- ✅ Channel management
- ✅ Responsive design
- ✅ Security implementation
- ✅ API documentation

## 🔧 Technologies Used

### Frontend
- **React 18** - UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library
- **Axios** - HTTP client
- **React Router** - Navigation (ready for implementation)

### Backend (Ready for Implementation)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📱 Responsive Design

The application is fully responsive and works on:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

Key responsive features:
- Collapsible sidebar
- Mobile-optimized search
- Responsive video grid
- Touch-friendly interactions

## 🎨 UI Components

### Header
- YouTube logo and branding
- Search bar with suggestions
- User authentication controls
- Mobile hamburger menu

### Sidebar
- Navigation menu
- User subscriptions
- Library sections
- Settings and help

### Video Components
- Video cards with thumbnails
- Video player with controls
- Like/dislike buttons
- Comment section

### Authentication
- Sign up/sign in modal
- Form validation
- JWT token management

## 📊 Sample Data

The application includes 12 sample videos covering:
- React tutorials
- JavaScript guides
- Node.js courses
- Web design trends
- Data science content
- DevOps tutorials

## 🔐 Authentication

Current authentication features:
- User registration and login
- JWT token storage
- Protected routes
- User profile management
- Channel ownership verification

## 💻 Development

### Available Scripts

- `npm run install-all` - Install all dependencies
- `npm run dev` - Start both frontend (Vite) and backend
- `npm run client` - Start frontend only (Vite dev server)
- `npm run server` - Start backend only
- `npm run build` - Build for production with Vite
- `npm run preview` - Preview production build

### Code Structure

The codebase follows modern React patterns:
- Functional components with hooks
- Context API for state management
- Custom hooks for reusable logic
- Modular component architecture
- Utility functions for common operations

## 📈 Next Steps

1. **Backend Implementation**
   - Set up Express.js server
   - Create MongoDB models
   - Implement API routes
   - Add JWT middleware

2. **Advanced Features**
   - Video upload functionality
   - Real-time notifications
   - Advanced search filters
   - Video recommendations

3. **Performance Optimization**
   - Lazy loading
   - Image optimization
   - Caching strategies
   - Bundle optimization



Made with all ❤️ by Abhishek Hiwarkar
