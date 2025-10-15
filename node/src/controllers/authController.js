import User from '../models/User.js'
import { sendTokenResponse } from '../utils/auth.js'

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        // Check if user exists
        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            })
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password
        })

        sendTokenResponse(user, 201, res)
    } catch (error) {
        next(error)
    }
}

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an email and password'
            })
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password')

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            })
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password)

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            })
        }

        sendTokenResponse(user, 200, res)
    } catch (error) {
        next(error)
    }
}

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
            .populate('enrolledCourses', 'title icon level')
            .populate('completedCourses', 'title icon level')

        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
export const updateDetails = async (req, res, next) => {
    try {
        const fieldsToUpdate = {
            name: req.body.name,
            email: req.body.email
        }

        const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
export const updatePassword = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('+password')

        // Check current password
        if (!(await user.matchPassword(req.body.currentPassword))) {
            return res.status(401).json({
                success: false,
                message: 'Password is incorrect'
            })
        }

        user.password = req.body.newPassword
        await user.save()

        sendTokenResponse(user, 200, res)
    } catch (error) {
        next(error)
    }
}
