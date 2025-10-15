import express from 'express'
import {
    getDashboard,
    getCourseProgress,
    updateCourseProgress,
    getActivities,
    getStats
} from '../controllers/dashboardController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.get('/', protect, getDashboard)
router.get('/activities', protect, getActivities)
router.get('/stats', protect, getStats)
router.get('/progress/course/:courseId', protect, getCourseProgress)
router.put('/progress/course/:courseId', protect, updateCourseProgress)

export default router
