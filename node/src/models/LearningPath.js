import mongoose from 'mongoose'

const learningPathSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a learning path title'],
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: '🎯'
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    },
    estimatedDuration: {
        type: String,
        required: true
    },
    prerequisites: [{
        type: String
    }],
    courses: [{
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        order: Number,
        required: Boolean
    }],
    learningGoals: [{
        type: String
    }],
    isPublished: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const LearningPath = mongoose.model('LearningPath', learningPathSchema)

export default LearningPath
