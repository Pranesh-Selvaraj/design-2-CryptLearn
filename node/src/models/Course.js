import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a course title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a course description']
    },
    longDescription: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: '📚'
    },
    image: {
        type: String
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    instructorName: {
        type: String
    },
    topics: [{
        type: String
    }],
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    students: {
        type: Number,
        default: 0
    },
    lessons: [{
        title: String,
        duration: String,
        type: {
            type: String,
            enum: ['video', 'text', 'interactive', 'quiz']
        },
        content: String,
        order: Number
    }],
    isPublished: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        enum: ['blockchain', 'cryptocurrency', 'trading', 'defi', 'nft', 'security'],
        default: 'blockchain'
    }
}, {
    timestamps: true
})

const Course = mongoose.model('Course', courseSchema)

export default Course
