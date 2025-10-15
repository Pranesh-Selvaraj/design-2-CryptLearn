# CryptLearn Backend API

RESTful API for the CryptLearn platform built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication**: JWT-based authentication with bcrypt password hashing
- **User Management**: Registration, login, profile updates
- **Course Management**: CRUD operations for courses
- **Learning Paths**: Structured learning journeys
- **Practice Exercises**: Multiple types (MCQ, True/False, Programming, etc.)
- **Progress Tracking**: Track user progress across courses and exercises
- **Dashboard & Analytics**: User stats, activity logs, and performance metrics
- **Role-Based Access**: Student, Instructor, and Admin roles

## 📋 Prerequisites

- Node.js 22.x or higher
- MongoDB 6.x or higher (local or Atlas)
- npm or yarn

## 🔧 Installation

1. Navigate to the node folder:

```bash
cd node
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file from the example:

```bash
cp .env.example .env
```

4. Update `.env` with your configuration:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/cryptlearn
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000
```

## 🗄️ Database Setup

### Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service:

```bash
sudo systemctl start mongod
```

### MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string and update `MONGODB_URI` in `.env`

### Seed Database

Populate database with sample data:

```bash
npm run seed
```

This creates:

- Sample users (admin & instructor)
- 6 courses
- 5 practice exercises
- 1 learning path

**Login Credentials:**

- Admin: `admin@cryptlearn.com` / `password123`
- Instructor: `instructor@cryptlearn.com` / `password123`

## 🏃 Running the Server

### Development Mode

```bash
npm run dev
```

Server will run on `http://localhost:5000` with auto-restart on file changes.

### Production Mode

```bash
npm start
```

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User

```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Course Endpoints

#### Get All Courses

```http
GET /api/courses?level=Beginner&search=bitcoin&page=1&limit=10
```

#### Get Single Course

```http
GET /api/courses/:id
```

#### Create Course (Instructor/Admin)

```http
POST /api/courses
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Course Title",
  "description": "Course description",
  "level": "Beginner",
  "duration": "4 weeks",
  "price": "Free"
}
```

### Exercise Endpoints

#### Get All Exercises

```http
GET /api/exercises?category=Quiz&difficulty=Easy
```

#### Submit Exercise Answer

```http
POST /api/exercises/:id/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "answer": "2009"
}
```

### Dashboard Endpoints

#### Get Dashboard Data

```http
GET /api/dashboard
Authorization: Bearer <token>
```

#### Get User Activities

```http
GET /api/dashboard/activities?page=1&limit=20
Authorization: Bearer <token>
```

#### Update Course Progress

```http
PUT /api/dashboard/progress/course/:courseId
Authorization: Bearer <token>
Content-Type: application/json

{
  "progress": 50,
  "status": "in-progress",
  "lessonId": "lesson123"
}
```

## 📁 Project Structure

```
node/
├── src/
│   ├── config/          # Configuration files
│   │   ├── config.js    # Environment config
│   │   └── database.js  # MongoDB connection
│   ├── controllers/     # Request handlers
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── exerciseController.js
│   │   └── dashboardController.js
│   ├── middleware/      # Custom middleware
│   │   ├── auth.js      # JWT authentication
│   │   └── errorHandler.js
│   ├── models/          # Mongoose schemas
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Exercise.js
│   │   ├── LearningPath.js
│   │   ├── Progress.js
│   │   └── Activity.js
│   ├── routes/          # API routes
│   │   ├── auth.js
│   │   ├── courses.js
│   │   ├── exercises.js
│   │   └── dashboard.js
│   ├── utils/           # Utility functions
│   │   ├── auth.js      # JWT helpers
│   │   └── seed.js      # Database seeder
│   └── server.js        # App entry point
├── .env.example         # Environment template
├── package.json
└── README.md
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 👥 User Roles

- **Student**: Default role, access to courses and exercises
- **Instructor**: Can create and manage courses
- **Admin**: Full access to all features

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based authorization
- Input validation
- CORS configuration
- Error handling middleware

## 📊 Database Models

### User

- Authentication credentials
- Profile information
- Progress tracking
- Points and badges
- Streaks

### Course

- Course content
- Instructor info
- Ratings and enrollment
- Lessons and topics

### Exercise

- Multiple question types
- Points and time limits
- Hints and explanations

### Progress

- User progress per course/exercise
- Completion status
- Time spent and scores

### Activity

- User activity log
- Points earned
- Related courses/exercises

## 🚨 Error Handling

API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

HTTP Status Codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## 📝 Environment Variables

| Variable    | Description        | Default                              |
| ----------- | ------------------ | ------------------------------------ |
| PORT        | Server port        | 5000                                 |
| NODE_ENV    | Environment        | development                          |
| MONGODB_URI | MongoDB connection | mongodb://localhost:27017/cryptlearn |
| JWT_SECRET  | JWT signing key    | -                                    |
| JWT_EXPIRE  | Token expiration   | 30d                                  |
| CLIENT_URL  | Frontend URL       | http://localhost:3000                |

## 🧪 Testing

```bash
# Test database connection
curl http://localhost:5000/health

# Test authentication
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@cryptlearn.com","password":"password123"}'
```

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **cors**: CORS middleware
- **dotenv**: Environment variables
- **morgan**: HTTP request logger
- **express-validator**: Input validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT

---

Built with ❤️ for CryptLearn
