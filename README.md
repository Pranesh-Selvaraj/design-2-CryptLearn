# CryptLearn - Full-Stack Cryptocurrency Learning Platform

A modern, comprehensive web application for learning about cryptography and blockchain technology. Built with React, Node.js, Express, MongoDB, and Tailwind CSS.

## 📁 Project Structure

```
cryptlearn/
├── web/                 # Frontend React application
│   ├── src/
│   ├── public/
│   ├── index.html
│   └── package.json
├── node/                # Backend API server
│   ├── src/
│   ├── .env.example
│   └── package.json
├── README.md
└── PROJECT_ARCHITECTURE.md
```

## 🚀 Features

### Frontend (React + Vite + Tailwind CSS)

- 📱 Responsive design (mobile, tablet, desktop)
- 🎨 Modern UI with Tailwind CSS
- 🧭 React Router for navigation
- 🔐 JWT authentication
- 📊 User dashboard with stats and progress
- 📚 Course catalog with search and filters
- 🎯 Learning paths
- ✍️ Practice exercises
- 📈 Activity log and analytics
- 🏆 Badges and points system

### Backend (Node.js + Express + MongoDB)

- 🔒 JWT-based authentication
- 👤 User management with roles
- 📖 Course CRUD operations
- 🎯 Learning path management
- ✅ Exercise system (MCQ, True/False, Programming, etc.)
- 📊 Progress tracking
- 🎯 Dashboard and analytics API
- 🏆 Gamification (points, badges, streaks)

## 🛠️ Tech Stack

### Frontend

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool
- **Tailwind CSS**: Utility-first CSS
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Lucide React**: Icon library

### Backend

- **Node.js 22**: JavaScript runtime
- **Express**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM
- **JWT**: Authentication
- **Bcrypt**: Password hashing

## 📋 Prerequisites

- Node.js 22.x or higher
- MongoDB 6.x or higher
- npm or yarn

## 🔧 Quick Start

### 1. Setup Backend

```bash
cd node
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run seed
npm run dev
```

Backend runs on: **http://localhost:5000**

### 2. Setup Frontend

```bash
cd web
npm install
npm run dev
```

Frontend runs on: **http://localhost:3000**

### 3. Login

Use these credentials to test:

- Admin: `admin@cryptlearn.com` / `password123`
- Instructor: `instructor@cryptlearn.com` / `password123`

## 🗄️ Database Setup

See [node/README.md](./node/README.md) for detailed database setup instructions.

Quick setup with MongoDB local:

```bash
# Install MongoDB
sudo apt-get install mongodb-community

# Start MongoDB
sudo systemctl start mongod

# Seed database
cd node && npm run seed
```

## 📚 Documentation

- [Backend API Documentation](./node/README.md)
- [Frontend Documentation](./web/README.md)

## 🎯 Key Features

Based on the architecture diagram, the application includes:

### Pages & Components

- **Landing Page**: Sign up/Login entry point
- **Homepage**: Resume learning and recommended content
- **Resources**: Learning paths, other resources, practice exercises
- **Contact**: Contact form and information
- **Settings**: User preferences
- **Help Center**: Support and documentation
- **Dashboard**: Activity tracking
  - Resume Learning
  - Badges
  - Points
  - Stats
  - Activity Log

### Learning Features

- **Learning Paths**: Structured courses with prerequisites
- **Practice Exercises**:
  - Monthly Challenges
  - Daily Challenges
  - Programming exercises
  - Mathematical problems
  - Quizzes (Short answers, MCQs, True/False, Numerical, Long form)
- **Other Resources**: Text resources, video instruction, interactive lessons, algorithms

### Progress Tracking

- Course completion status
- Exercise attempts and scores
- Points and badges system
- Activity log
- Streak tracking

## 🔐 Authentication

JWT-based authentication with role-based access control:

- **Student**: Access courses and exercises
- **Instructor**: Create and manage courses
- **Admin**: Full system access

## 📊 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Courses

- `GET /api/courses` - Get all courses (with filters)
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (Instructor/Admin)

### Exercises

- `GET /api/exercises` - Get exercises (with filters)
- `POST /api/exercises/:id/submit` - Submit answer

### Dashboard

- `GET /api/dashboard` - Get dashboard data
- `GET /api/dashboard/activities` - Get activity log
- `PUT /api/dashboard/progress/course/:courseId` - Update progress

See [node/README.md](./node/README.md) for complete API documentation.

## 🚀 Deployment

### Backend

Deploy to: Heroku, Railway, Render, or DigitalOcean

Required environment variables:

- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `CLIENT_URL`

### Frontend

Deploy to: Vercel, Netlify, or AWS S3

Update API base URL in `web/src/services/api.js`

## 📖 Additional Documentation

- `README_OLD.md` - Original frontend-only documentation
- `QUICKSTART.md` - Quick start guide
- `PROJECT_SUMMARY.md` - Project overview

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---
