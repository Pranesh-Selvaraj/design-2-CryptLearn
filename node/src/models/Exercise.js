import mongoose from 'mongoose'

const exerciseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide an exercise title'],
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['short-answer', 'mcq', 'true-false', 'numerical', 'programming', 'long-form'],
        required: true
    },
    category: {
        type: String,
        enum: ['Monthly Challenge', 'Daily Challenge', 'Programming', 'Mathematical', 'Quiz'],
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    question: {
        type: String,
        required: true
    },
    options: [{
        text: String,
        isCorrect: Boolean
    }],
    correctAnswer: mongoose.Schema.Types.Mixed,
    hints: [{
        type: String
    }],
    explanation: {
        type: String
    },
    points: {
        type: Number,
        default: 10
    },
    timeLimit: {
        type: Number, // in minutes
        default: null
    },
    attempts: {
        type: Number,
        default: 3
    },
    prerequisites: [{
        type: String
    }],
    tags: [{
        type: String
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

export default Exercise
