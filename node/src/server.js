import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import config from './config/config.js'
import errorHandler from './middleware/errorHandler.js'

// Route imports
import authRoutes from './routes/auth.js'
import courseRoutes from './routes/courses.js'
import exerciseRoutes from './routes/exercises.js'
import dashboardRoutes from './routes/dashboard.js'

// Load env vars
dotenv.config()

// Connect to database
connectDB()

const app = express()

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS
app.use(cors({
    origin: config.clientUrl,
    credentials: true
}))

// Dev logging middleware
if (config.nodeEnv === 'development') {
    app.use(morgan('dev'))
}

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'CryptLearn API is running',
        timestamp: new Date().toISOString()
    })
})

// Mount routers
app.use('/api/auth', authRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/exercises', exerciseRoutes)
app.use('/api/dashboard', dashboardRoutes)

// Error handler
app.use(errorHandler)

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    })
})

const PORT = config.port

const server = app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════╗
║   🚀 CryptLearn API Server Running   ║
╠═══════════════════════════════════════╣
║   Environment: ${config.nodeEnv.padEnd(23)}║
║   Port: ${PORT.toString().padEnd(30)}║
║   Database: Connected               ║
╚═══════════════════════════════════════╝
  `)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`❌ Error: ${err.message}`)
    // Close server & exit process
    server.close(() => process.exit(1))
})

export default app
