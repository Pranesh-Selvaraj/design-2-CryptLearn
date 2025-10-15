import Exercise from '../models/Exercise.js'
import Progress from '../models/Progress.js'
import Activity from '../models/Activity.js'
import User from '../models/User.js'

// @desc    Get all exercises
// @route   GET /api/exercises
// @access  Public
export const getExercises = async (req, res, next) => {
    try {
        const { category, difficulty, type, limit = 20, page = 1 } = req.query

        const filter = { isActive: true }

        if (category) filter.category = category
        if (difficulty) filter.difficulty = difficulty
        if (type) filter.type = type

        const exercises = await Exercise.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 })
            .populate('course', 'title icon')

        const count = await Exercise.countDocuments(filter)

        res.status(200).json({
            success: true,
            count,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(count / limit)
            },
            data: exercises
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Get single exercise
// @route   GET /api/exercises/:id
// @access  Public
export const getExercise = async (req, res, next) => {
    try {
        const exercise = await Exercise.findById(req.params.id)
            .populate('course', 'title icon level')

        if (!exercise) {
            return res.status(404).json({
                success: false,
                message: 'Exercise not found'
            })
        }

        res.status(200).json({
            success: true,
            data: exercise
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Submit exercise answer
// @route   POST /api/exercises/:id/submit
// @access  Private
export const submitExercise = async (req, res, next) => {
    try {
        const { answer } = req.body
        const exercise = await Exercise.findById(req.params.id)

        if (!exercise) {
            return res.status(404).json({
                success: false,
                message: 'Exercise not found'
            })
        }

        // Check answer (simplified logic - you'd want more robust checking)
        let isCorrect = false
        let score = 0

        if (exercise.type === 'mcq') {
            const correctOption = exercise.options.find(opt => opt.isCorrect)
            isCorrect = correctOption && correctOption.text === answer
        } else if (exercise.type === 'true-false') {
            isCorrect = exercise.correctAnswer === answer
        } else {
            // For other types, you'd need more complex comparison
            isCorrect = String(exercise.correctAnswer).toLowerCase() === String(answer).toLowerCase()
        }

        if (isCorrect) {
            score = 100
        }

        // Update or create progress
        let progress = await Progress.findOne({
            user: req.user.id,
            exercise: exercise._id
        })

        if (progress) {
            progress.attempts += 1
            progress.score = Math.max(progress.score || 0, score)
            progress.status = isCorrect ? 'completed' : progress.status
            if (isCorrect && !progress.completedAt) {
                progress.completedAt = new Date()
            }
        } else {
            progress = await Progress.create({
                user: req.user.id,
                exercise: exercise._id,
                type: 'exercise',
                attempts: 1,
                score,
                status: isCorrect ? 'completed' : 'in-progress',
                startedAt: new Date(),
                completedAt: isCorrect ? new Date() : null
            })
        }

        await progress.save()

        // Add points to user if correct
        if (isCorrect) {
            await User.findByIdAndUpdate(req.user.id, {
                $inc: { points: exercise.points }
            })

            // Create activity
            await Activity.create({
                user: req.user.id,
                type: 'exercise-completed',
                title: 'Exercise Completed',
                description: `Completed "${exercise.title}"`,
                relatedExercise: exercise._id,
                points: exercise.points
            })
        }

        res.status(200).json({
            success: true,
            data: {
                isCorrect,
                score,
                explanation: exercise.explanation,
                correctAnswer: isCorrect ? null : exercise.correctAnswer,
                attempts: progress.attempts
            }
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Create exercise
// @route   POST /api/exercises
// @access  Private (Instructor/Admin)
export const createExercise = async (req, res, next) => {
    try {
        const exercise = await Exercise.create(req.body)

        res.status(201).json({
            success: true,
            data: exercise
        })
    } catch (error) {
        next(error)
    }
}
