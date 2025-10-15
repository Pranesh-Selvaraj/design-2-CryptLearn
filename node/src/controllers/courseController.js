import Course from '../models/Course.js'

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
export const getCourses = async (req, res, next) => {
    try {
        const { level, search, category, limit = 10, page = 1 } = req.query

        // Build filter
        const filter = { isPublished: true }

        if (level) {
            filter.level = level
        }

        if (category) {
            filter.category = category
        }

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        }

        // Execute query with pagination
        const courses = await Course.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 })
            .populate('instructor', 'name email')

        // Get total count
        const count = await Course.countDocuments(filter)

        res.status(200).json({
            success: true,
            count,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(count / limit)
            },
            data: courses
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
export const getCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('instructor', 'name email avatar')

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            })
        }

        res.status(200).json({
            success: true,
            data: course
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Create new course
// @route   POST /api/courses
// @access  Private (Instructor/Admin)
export const createCourse = async (req, res, next) => {
    try {
        // Add user to req.body
        req.body.instructor = req.user.id
        req.body.instructorName = req.user.name

        const course = await Course.create(req.body)

        res.status(201).json({
            success: true,
            data: course
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (Instructor/Admin)
export const updateCourse = async (req, res, next) => {
    try {
        let course = await Course.findById(req.params.id)

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            })
        }

        // Make sure user is course owner or admin
        if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to update this course'
            })
        }

        course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            data: course
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (Instructor/Admin)
export const deleteCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id)

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            })
        }

        // Make sure user is course owner or admin
        if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to delete this course'
            })
        }

        await course.deleteOne()

        res.status(200).json({
            success: true,
            data: {}
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Get featured courses
// @route   GET /api/courses/featured
// @access  Public
export const getFeaturedCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({ isPublished: true })
            .sort({ rating: -1, students: -1 })
            .limit(6)

        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        })
    } catch (error) {
        next(error)
    }
}
