import mongoose from 'mongoose'

const progressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    learningPath: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LearningPath'
    },
    exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise'
    },
    type: {
        type: String,
        enum: ['course', 'learning-path', 'exercise', 'lesson'],
        required: true
    },
    status: {
        type: String,
        enum: ['not-started', 'in-progress', 'completed'],
        default: 'not-started'
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    completedLessons: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    timeSpent: {
        type: Number, // in minutes
        default: 0
    },
    lastAccessed: {
        type: Date,
        default: Date.now
    },
    startedAt: {
        type: Date
    },
    completedAt: {
        type: Date
    },
    score: {
        type: Number,
        min: 0,
        max: 100
    },
    attempts: {
        type: Number,
        default: 0
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
})

// Compound index for unique user progress per item
progressSchema.index({ user: 1, course: 1 }, { unique: true, sparse: true })
progressSchema.index({ user: 1, exercise: 1 }, { unique: true, sparse: true })
progressSchema.index({ user: 1, learningPath: 1 }, { unique: true, sparse: true })

const Progress = mongoose.model('Progress', progressSchema)

export default Progress
