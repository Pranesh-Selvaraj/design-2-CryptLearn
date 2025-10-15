import express from 'express'
import {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    getFeaturedCourses
} from '../controllers/courseController.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

router.get('/featured', getFeaturedCourses)
router.route('/')
    .get(getCourses)
    .post(protect, authorize('instructor', 'admin'), createCourse)

router.route('/:id')
    .get(getCourse)
    .put(protect, authorize('instructor', 'admin'), updateCourse)
    .delete(protect, authorize('instructor', 'admin'), deleteCourse)

export default router
