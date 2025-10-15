import Progress from '../models/Progress.js'
import Activity from '../models/Activity.js'
import User from '../models/User.js'
import Course from '../models/Course.js'

// @desc    Get user dashboard
// @route   GET /api/dashboard
// @access  Private
export const getDashboard = async (req, res, next) => {
    try {
        const userId = req.user.id

        // Get user with basic stats
        const user = await User.findById(userId)
            .select('name email points badges streak enrolledCourses completedCourses')
            .populate('enrolledCourses', 'title icon level')
            .populate('completedCourses', 'title icon level')

        // Get progress summary
        const progressStats = await Progress.aggregate([
            { $match: { user: user._id } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ])

        // Get recent activities
        const recentActivities = await Activity.find({ user: userId })
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('relatedCourse', 'title icon')
            .populate('relatedExercise', 'title')

        // Get in-progress courses with progress
        const inProgressCourses = await Progress.find({
            user: userId,
            type: 'course',
            status: 'in-progress'
        })
            .populate('course', 'title icon level duration')
            .limit(5)

        // Calculate stats
        const stats = {
            totalPoints: user.points,
            currentStreak: user.streak.current,
            longestStreak: user.streak.longest,
            badgesEarned: user.badges.length,
            coursesEnrolled: user.enrolledCourses.length,
            coursesCompleted: user.completedCourses.length,
            inProgress: progressStats.find(s => s._id === 'in-progress')?.count || 0,
            completed: progressStats.find(s => s._id === 'completed')?.count || 0
        }

        res.status(200).json({
            success: true,
            data: {
                user: {
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar
                },
                stats,
                inProgressCourses,
                recentActivities,
                badges: user.badges
            }
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Get user progress for a course
// @route   GET /api/progress/course/:courseId
// @access  Private
export const getCourseProgress = async (req, res, next) => {
    try {
        const progress = await Progress.findOne({
            user: req.user.id,
            course: req.params.courseId
        }).populate('course')

        res.status(200).json({
            success: true,
            data: progress
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Update course progress
// @route   PUT /api/progress/course/:courseId
// @access  Private
export const updateCourseProgress = async (req, res, next) => {
    try {
        const { progress, lessonId, status } = req.body

        let progressDoc = await Progress.findOne({
            user: req.user.id,
            course: req.params.courseId
        })

        if (!progressDoc) {
            progressDoc = await Progress.create({
                user: req.user.id,
                course: req.params.courseId,
                type: 'course',
                status: status || 'in-progress',
                progress: progress || 0,
                startedAt: new Date()
            })
        } else {
            if (progress !== undefined) progressDoc.progress = progress
            if (status) progressDoc.status = status
            if (lessonId && !progressDoc.completedLessons.includes(lessonId)) {
                progressDoc.completedLessons.push(lessonId)
            }
            if (status === 'completed' && !progressDoc.completedAt) {
                progressDoc.completedAt = new Date()

                // Add course to user's completed courses
                await User.findByIdAndUpdate(req.user.id, {
                    $addToSet: { completedCourses: req.params.courseId }
                })

                // Create activity
                const course = await Course.findById(req.params.courseId)
                await Activity.create({
                    user: req.user.id,
                    type: 'course-completed',
                    title: 'Course Completed',
                    description: `Completed "${course.title}"`,
                    relatedCourse: course._id,
                    points: 100
                })

                // Award points
                await User.findByIdAndUpdate(req.user.id, {
                    $inc: { points: 100 }
                })
            }
        }

        progressDoc.lastAccessed = new Date()
        await progressDoc.save()

        res.status(200).json({
            success: true,
            data: progressDoc
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Get user activities
// @route   GET /api/dashboard/activities
// @access  Private
export const getActivities = async (req, res, next) => {
    try {
        const { limit = 20, page = 1 } = req.query

        const activities = await Activity.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('relatedCourse', 'title icon')
            .populate('relatedExercise', 'title type')

        const count = await Activity.countDocuments({ user: req.user.id })

        res.status(200).json({
            success: true,
            count,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(count / limit)
            },
            data: activities
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Get user stats
// @route   GET /api/dashboard/stats
// @access  Private
export const getStats = async (req, res, next) => {
    try {
        const userId = req.user.id

        // Get score points over time (last 30 days)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const pointsOverTime = await Activity.aggregate([
            {
                $match: {
                    user: userId,
                    createdAt: { $gte: thirtyDaysAgo },
                    points: { $gt: 0 }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    points: { $sum: '$points' }
                }
            },
            { $sort: { _id: 1 } }
        ])

        // Get practice exercise stats
        const exerciseStats = await Progress.aggregate([
            { $match: { user: userId, type: 'exercise' } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ])

        // Get completion rate per lesson type
        const lessonStats = await Progress.aggregate([
            { $match: { user: userId, type: 'course' } },
            {
                $group: {
                    _id: null,
                    totalLessons: { $sum: { $size: '$completedLessons' } },
                    avgProgress: { $avg: '$progress' }
                }
            }
        ])

        res.status(200).json({
            success: true,
            data: {
                pointsOverTime,
                exerciseStats,
                lessonStats: lessonStats[0] || { totalLessons: 0, avgProgress: 0 }
            }
        })
    } catch (error) {
        next(error)
    }
}
