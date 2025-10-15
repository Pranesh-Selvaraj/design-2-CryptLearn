import express from 'express'
import {
    getExercises,
    getExercise,
    submitExercise,
    createExercise
} from '../controllers/exerciseController.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

router.route('/')
    .get(getExercises)
    .post(protect, authorize('instructor', 'admin'), createExercise)

router.get('/:id', getExercise)
router.post('/:id/submit', protect, submitExercise)

export default router
