# YouTube Clone - MERN Stack

A fully responsive YouTube clone built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring video browsing, user authentication, channel management, and comment system.

## 📋 Features

### Frontend (React)
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Video Gallery**: Grid layout with 12 sample videos
- **Search & Filter**: Search videos by title and filter by categories
- **User Authentication**: Sign up, sign in with JWT tokens
- **Video Player**: Embedded YouTube videos with like/dislike functionality
- **Comment System**: Add, edit, delete comments on videos
- **Channel Management**: Create and manage personal channels
- **Modern UI**: Clean, YouTube-inspired interface with Tailwind CSS

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
git clone <your-repo-url>
cd youtube-clone
```

2. **Install all dependencies**
```bash
npm run install-all
```

3. **Start development servers**
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000 (when implemented)

### Individual Development

**Frontend only:**
```bash
npm run client
```

**Backend only:**
```bash
npm run server
```

## 📁 Project Structure

```
youtube-clone/
├── frontend/                    # React Application
│   ├── public/
│   ├── src/
│   │   ├── components/          # Reusable Components
│   │   │   ├── Header.js
│   │   │   ├── Sidebar.js
│   │   │   ├── VideoCard.js
│   │   │   ├── VideoPlayer.js
│   │   │   ├── CommentSection.js
│   │   │   ├── AuthModal.js
│   │   │   └── ChannelForm.js
│   │   ├── pages/               # Main Pages
│   │   │   ├── HomePage.js
│   │   │   ├── VideoPage.js
│   │   │   ├── ChannelPage.js
│   │   │   └── ProfilePage.js
│   │   ├── context/             # React Context
│   │   │   └── AuthContext.js
│   │   ├── hooks/               # Custom Hooks
│   │   │   ├── useAuth.js
│   │   │   └── useApi.js
│   │   ├── services/            # API Services
│   │   │   └── api.js
│   │   ├── utils/               # Helper Functions
│   │   │   └── helpers.js
│   │   ├── data/                # Mock Data
│   │   │   └── mockData.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── backend/                     # Node.js Server (Ready for Implementation)
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── .gitignore
├── README.md
└── package.json
```

## 🎯 Current Implementation Status

### ✅ Completed (Frontend)
- [x] Responsive header with search functionality
- [x] Collapsible sidebar navigation
- [x] Video grid with 12 sample videos
- [x] Category filtering (Technology, Education, Design, etc.)
- [x] Video search functionality
- [x] User authentication (sign up/sign in)
- [x] Video player page with embedded videos
- [x] Like/dislike functionality
- [x] Comment system (add, edit, delete)
- [x] Channel creation and management
- [x] User profile management
- [x] Mobile-responsive design
- [x] Mock data integration

### 🔄 Ready for Backend Integration
- [ ] MongoDB database setup
- [ ] Express.js API routes
- [ ] JWT authentication middleware
- [ ] Video upload functionality
- [ ] Real-time comment updates
- [ ] User subscription system
- [ ] Video analytics

## 🔧 Technologies Used

### Frontend
- **React 18** - UI library
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
- `npm run dev` - Start both frontend and backend
- `npm run client` - Start frontend only
- `npm run server` - Start backend only
- `npm run build` - Build for production

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- YouTube for design inspiration
- React and Tailwind CSS communities
- All contributors and testers

---

**Note**: This is a educational project for learning MERN stack development. Not affiliated with YouTube.
