# CryptLearn - Project Architecture

This document describes the architecture of the CryptLearn platform based on the Figma design.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────┐
│              Client (Browser)                    │
│  ┌──────────────────────────────────────────┐  │
│  │   React Frontend (web/)                  │  │
│  │   - Pages & Components                    │  │
│  │   - State Management                      │  │
│  │   - API Integration                       │  │
│  └──────────────┬───────────────────────────┘  │
└─────────────────┼───────────────────────────────┘
                  │ HTTP/HTTPS (REST API)
                  │ JWT Authentication
┌─────────────────┼───────────────────────────────┐
│                 ▼                                │
│  ┌──────────────────────────────────────────┐  │
│  │   Express.js Backend (node/)             │  │
│  │   - Routes & Controllers                  │  │
│  │   - Authentication Middleware             │  │
│  │   - Business Logic                        │  │
│  └──────────────┬───────────────────────────┘  │
│                 │                                │
│                 │ Mongoose ODM                   │
│                 ▼                                │
│  ┌──────────────────────────────────────────┐  │
│  │   MongoDB Database                        │  │
│  │   - Collections (Users, Courses, etc.)    │  │
│  └──────────────────────────────────────────┘  │
│                                                  │
│              Server                              │
└──────────────────────────────────────────────────┘
```

## 📁 Folder Structure

### Root Level

```
cryptlearn/
├── web/                    # Frontend application
├── node/                   # Backend API
├── README.md              # Main documentation
├── PROJECT_ARCHITECTURE.md # This file
├── .gitignore
└── package.json           # Root package (optional)
```

### Frontend Structure (web/)

```
web/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Layout.jsx     # Main layout wrapper
│   │   ├── Navbar.jsx     # Navigation with auth
│   │   ├── Footer.jsx     # Footer component
│   │   ├── Hero.jsx       # Hero sections
│   │   ├── CourseCard.jsx # Course display
│   │   ├── ExerciseCard.jsx
│   │   ├── FeatureCard.jsx
│   │   ├── StatsCard.jsx
│   │   ├── ActivityItem.jsx
│   │   └── BadgeDisplay.jsx
│   ├── pages/            # Page components
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Home.jsx      # Landing page
│   │   ├── Homepage.jsx  # After login home
│   │   ├── Dashboard.jsx # User dashboard
│   │   ├── Courses.jsx   # Course catalog
│   │   ├── CourseDetail.jsx
│   │   ├── LearningPaths.jsx
│   │   ├── Resources.jsx # Learning resources
│   │   ├── Exercises.jsx # Practice exercises
│   │   ├── ExerciseDetail.jsx
│   │   ├── ActivityLog.jsx
│   │   ├── Settings.jsx
│   │   ├── HelpCenter.jsx
│   │   ├── Contact.jsx
│   │   └── About.jsx
│   ├── services/         # API integration
│   │   ├── api.js        # Axios instance
│   │   ├── authService.js
│   │   ├── courseService.js
│   │   ├── exerciseService.js
│   │   └── dashboardService.js
│   ├── context/          # React Context
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/            # Custom hooks
│   │   ├── useAuth.js
│   │   ├── useCourses.js
│   │   └── useProgress.js
│   ├── utils/            # Utility functions
│   │   ├── helpers.js
│   │   ├── validators.js
│   │   └── constants.js
│   ├── data/             # Static data
│   │   └── courses.js
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── package.json         # Dependencies
```

### Backend Structure (node/)

```
node/
├── src/
│   ├── config/          # Configuration
│   │   ├── config.js    # Environment config
│   │   └── database.js  # MongoDB connection
│   ├── controllers/     # Request handlers
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── learningPathController.js
│   │   ├── exerciseController.js
│   │   ├── dashboardController.js
│   │   └── userController.js
│   ├── middleware/      # Custom middleware
│   │   ├── auth.js      # JWT verification
│   │   ├── errorHandler.js
│   │   └── validators.js
│   ├── models/          # Mongoose schemas
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── LearningPath.js
│   │   ├── Exercise.js
│   │   ├── Progress.js
│   │   └── Activity.js
│   ├── routes/          # API routes
│   │   ├── auth.js
│   │   ├── courses.js
│   │   ├── learningPaths.js
│   │   ├── exercises.js
│   │   ├── dashboard.js
│   │   └── users.js
│   ├── utils/           # Utilities
│   │   ├── auth.js      # JWT helpers
│   │   ├── seed.js      # Database seeder
│   │   └── validators.js
│   └── server.js        # Express app
├── .env                 # Environment variables
├── .env.example         # Environment template
├── .gitignore
├── package.json
└── README.md
```

## 🔄 Data Flow

### Authentication Flow

```
1. User enters credentials → Frontend
2. POST /api/auth/login → Backend
3. Verify credentials → Database
4. Generate JWT token → Backend
5. Return token + user data → Frontend
6. Store token in localStorage → Frontend
7. Include token in Authorization header for subsequent requests
```

### Course Enrollment Flow

```
1. User clicks "Enroll" → Frontend
2. PUT /api/dashboard/progress/course/:id → Backend
3. Create Progress record → Database
4. Update User.enrolledCourses → Database
5. Create Activity record → Database
6. Return updated progress → Frontend
7. Update UI → Frontend
```

### Exercise Submission Flow

```
1. User submits answer → Frontend
2. POST /api/exercises/:id/submit → Backend
3. Validate answer → Backend
4. Calculate score → Backend
5. Update Progress → Database
6. Award points → Database (User model)
7. Create Activity → Database
8. Return result + explanation → Frontend
9. Display feedback → Frontend
```

## 📊 Database Schema

### Collections

#### users

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (student/instructor/admin),
  avatar: String,
  enrolledCourses: [ObjectId],
  completedCourses: [ObjectId],
  badges: [{
    name: String,
    icon: String,
    earnedAt: Date
  }],
  points: Number,
  streak: {
    current: Number,
    longest: Number,
    lastActivity: Date
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### courses

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  longDescription: String,
  level: String,
  duration: String,
  price: String,
  icon: String,
  image: String,
  instructor: ObjectId (ref: User),
  instructorName: String,
  topics: [String],
  rating: Number,
  students: Number,
  lessons: [{
    title: String,
    duration: String,
    type: String,
    content: String,
    order: Number
  }],
  isPublished: Boolean,
  category: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### exercises

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  type: String (mcq/true-false/programming/numerical/long-form),
  category: String,
  difficulty: String,
  course: ObjectId (ref: Course),
  question: String,
  options: [{
    text: String,
    isCorrect: Boolean
  }],
  correctAnswer: Mixed,
  hints: [String],
  explanation: String,
  points: Number,
  timeLimit: Number,
  attempts: Number,
  tags: [String],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### progress

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  course: ObjectId (ref: Course),
  exercise: ObjectId (ref: Exercise),
  learningPath: ObjectId (ref: LearningPath),
  type: String,
  status: String (not-started/in-progress/completed),
  progress: Number (0-100),
  completedLessons: [ObjectId],
  timeSpent: Number,
  lastAccessed: Date,
  startedAt: Date,
  completedAt: Date,
  score: Number,
  attempts: Number,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### activities

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  type: String,
  title: String,
  description: String,
  relatedCourse: ObjectId (ref: Course),
  relatedExercise: ObjectId (ref: Exercise),
  metadata: Mixed,
  points: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### learningPaths

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  icon: String,
  difficulty: String,
  estimatedDuration: String,
  prerequisites: [String],
  courses: [{
    course: ObjectId (ref: Course),
    order: Number,
    required: Boolean
  }],
  learningGoals: [String],
  isPublished: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Security

### Authentication

- JWT tokens with expiration
- Bcrypt password hashing (10 rounds)
- Secure HTTP-only cookies (optional)
- Token refresh mechanism (optional)

### Authorization

- Role-based access control (RBAC)
- Route protection middleware
- Resource ownership verification

### Best Practices

- Input validation
- SQL injection prevention (NoSQL)
- XSS protection
- CORS configuration
- Rate limiting (optional)
- Helmet.js for security headers (optional)

## 🎨 UI/UX Architecture (Based on Figma)

### Page Hierarchy

```
Landing Page
├── Sign up / Login
└── Homepage (After Login)
    ├── Resume Learning
    ├── Recommended Learning
    └── Navigation to:
        ├── Resources
        │   ├── Learning Paths
        │   │   ├── Overview
        │   │   ├── Prerequisites and Next Steps
        │   │   ├── Start Learning
        │   │   └── Practice
        │   ├── Other Resources
        │   │   ├── Text Resources
        │   │   ├── Video Instruction
        │   │   ├── Interactive Lessons
        │   │   └── Algorithms & Programming
        │   └── Practice Exercises
        │       ├── Monthly Challenge
        │       ├── Daily Challenge
        │       ├── Programming
        │       ├── Mathematical
        │       └── Quiz (Short/MCQ/True-False/Numerical/Long)
        ├── Contact
        ├── Settings
        ├── Help Center
        │   ├── Hints
        │   ├── Share
        │   └── Submit + Exit
        └── Dashboard
            ├── Resume Learning
            ├── Badges
            ├── Points
            ├── Stats
            │   ├── Score Points
            │   ├── Badges
            │   ├── Practice (Completed/In-Progress)
            │   └── Lessons
            └── Activity Log
                ├── Practice Exercises
                └── Lessons
```

### Component Hierarchy

```
App
├── Layout
│   ├── Navbar (with auth state)
│   ├── Main Content
│   └── Footer
├── Auth Pages
│   ├── Login
│   └── Register
├── Public Pages
│   ├── Landing
│   ├── About
│   └── Contact
└── Protected Pages
    ├── Homepage
    ├── Dashboard
    ├── Courses
    ├── Learning Paths
    ├── Exercises
    ├── Settings
    └── Help Center
```

## 🚀 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update user details
- `PUT /api/auth/updatepassword` - Update password

### Courses

- `GET /api/courses` - Get all courses (with filters)
- `GET /api/courses/featured` - Get featured courses
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (Instructor/Admin)
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Learning Paths

- `GET /api/learning-paths` - Get all learning paths
- `GET /api/learning-paths/:id` - Get single path
- `POST /api/learning-paths` - Create path (Admin)

### Exercises

- `GET /api/exercises` - Get all exercises
- `GET /api/exercises/:id` - Get single exercise
- `POST /api/exercises/:id/submit` - Submit answer
- `POST /api/exercises` - Create exercise (Instructor/Admin)

### Dashboard

- `GET /api/dashboard` - Get dashboard data
- `GET /api/dashboard/activities` - Get activity log
- `GET /api/dashboard/stats` - Get user stats
- `GET /api/dashboard/progress/course/:courseId` - Get course progress
- `PUT /api/dashboard/progress/course/:courseId` - Update course progress

## 📱 Responsive Design

### Breakpoints (Tailwind CSS)

- `sm`: 640px (mobile)
- `md`: 768px (tablet)
- `lg`: 1024px (laptop)
- `xl`: 1280px (desktop)
- `2xl`: 1536px (large desktop)

### Mobile-First Approach

- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly UI elements
- Optimized images and assets

## 🎯 Future Enhancements

1. **Real-time Features**

   - WebSocket for live updates
   - Real-time leaderboards
   - Live coding challenges

2. **Social Features**

   - User profiles
   - Follow system
   - Comments and discussions
   - Share achievements

3. **Advanced Learning**

   - AI-powered recommendations
   - Personalized learning paths
   - Adaptive difficulty

4. **Gamification**

   - Advanced badge system
   - Leaderboards
   - Challenges and competitions
   - Team features

5. **Content**
   - Video lessons integration
   - Interactive coding playground
   - Downloadable resources
   - Certificates

## 📝 Development Workflow

1. **Feature Development**

   - Create feature branch
   - Implement backend API
   - Create/update models
   - Add frontend components
   - Connect API to frontend
   - Test functionality
   - Submit PR

2. **Testing**

   - Unit tests (Jest)
   - Integration tests
   - End-to-end tests (Cypress)
   - Manual testing

3. **Deployment**
   - Backend → Railway/Heroku/Render
   - Frontend → Vercel/Netlify
   - Database → MongoDB Atlas
   - CI/CD with GitHub Actions

---

**Last Updated**: October 15, 2025
**Version**: 1.0.0
