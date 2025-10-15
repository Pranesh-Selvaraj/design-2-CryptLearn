import mongoose from 'mongoose'

const activitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: [
            'course-started',
            'course-completed',
            'lesson-completed',
            'exercise-completed',
            'badge-earned',
            'level-up',
            'streak-milestone',
            'quiz-passed',
            'quiz-failed',
            'resource-viewed',
            'comment-posted'
        ],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    relatedCourse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    relatedExercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise'
    },
    metadata: mongoose.Schema.Types.Mixed,
    points: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

// Index for efficient querying
activitySchema.index({ user: 1, createdAt: -1 })

const Activity = mongoose.model('Activity', activitySchema)

export default Activity
