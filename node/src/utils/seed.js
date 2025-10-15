import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from '../config/database.js'
import User from '../models/User.js'
import Course from '../models/Course.js'
import Exercise from '../models/Exercise.js'
import LearningPath from '../models/LearningPath.js'

dotenv.config()

const seedDatabase = async () => {
    try {
        await connectDB()

        // Clear existing data
        console.log('Clearing existing data...')
        await User.deleteMany()
        await Course.deleteMany()
        await Exercise.deleteMany()
        await LearningPath.deleteMany()

        // Create admin user
        console.log('Creating users...')
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@cryptlearn.com',
            password: 'password123',
            role: 'admin'
        })

        const instructorUser = await User.create({
            name: 'John Doe',
            email: 'instructor@cryptlearn.com',
            password: 'password123',
            role: 'instructor'
        })

        // Create courses
        console.log('Creating courses...')
        const courses = await Course.insertMany([
            {
                title: 'Bitcoin Fundamentals',
                description: 'Master the basics of Bitcoin, blockchain technology, and how cryptocurrency transactions work.',
                longDescription: 'This comprehensive course will teach you everything you need to know about Bitcoin from the ground up. You\'ll learn about the history of Bitcoin, how blockchain technology works, and how to safely store and transact with cryptocurrency.',
                level: 'Beginner',
                duration: '4 weeks',
                price: 'Free',
                icon: '₿',
                instructor: instructorUser._id,
                instructorName: 'John Doe',
                topics: [
                    'Introduction to Bitcoin',
                    'Blockchain Technology',
                    'Bitcoin Mining',
                    'Wallet Security',
                    'Transaction Process'
                ],
                rating: 4.8,
                students: 12345,
                category: 'blockchain',
                isPublished: true
            },
            {
                title: 'Ethereum & Smart Contracts',
                description: 'Learn how to build decentralized applications (DApps) on the Ethereum blockchain using Solidity.',
                longDescription: 'Dive deep into Ethereum and learn how to create smart contracts and decentralized applications. This course covers Solidity programming, testing, deployment, and best practices for building on Ethereum.',
                level: 'Intermediate',
                duration: '6 weeks',
                price: '$99',
                icon: '⧫',
                instructor: instructorUser._id,
                instructorName: 'John Doe',
                topics: [
                    'Ethereum Architecture',
                    'Smart Contract Development',
                    'Solidity Programming',
                    'DApp Development',
                    'Web3.js Integration'
                ],
                rating: 4.7,
                students: 8921,
                category: 'blockchain',
                isPublished: true
            },
            {
                title: 'Cryptocurrency Trading',
                description: 'Understand market analysis, trading strategies, and risk management in cryptocurrency markets.',
                longDescription: 'Learn professional cryptocurrency trading techniques, from technical analysis to portfolio management. Understand market psychology and develop strategies for successful trading.',
                level: 'Intermediate',
                duration: '5 weeks',
                price: '$149',
                icon: '📈',
                instructor: instructorUser._id,
                instructorName: 'John Doe',
                topics: [
                    'Technical Analysis',
                    'Chart Patterns',
                    'Trading Strategies',
                    'Risk Management',
                    'Portfolio Management'
                ],
                rating: 4.6,
                students: 15678,
                category: 'trading',
                isPublished: true
            },
            {
                title: 'DeFi Protocols',
                description: 'Explore decentralized finance (DeFi) protocols, yield farming, and liquidity provision.',
                longDescription: 'Master the world of decentralized finance. Learn about lending protocols, yield farming strategies, liquidity provision, and how to navigate the DeFi ecosystem safely.',
                level: 'Advanced',
                duration: '8 weeks',
                price: '$199',
                icon: '🏦',
                instructor: instructorUser._id,
                instructorName: 'John Doe',
                topics: [
                    'DeFi Fundamentals',
                    'Yield Farming',
                    'Liquidity Pools',
                    'DEX Protocols',
                    'Risk Assessment'
                ],
                rating: 4.9,
                students: 5432,
                category: 'defi',
                isPublished: true
            },
            {
                title: 'NFT Creation & Marketing',
                description: 'Create, mint, and market your own NFTs on various blockchain platforms.',
                longDescription: 'Learn how to create and sell NFTs. This course covers the entire process from creating digital assets to minting and marketing your NFT collection.',
                level: 'Beginner',
                duration: '3 weeks',
                price: '$79',
                icon: '🎨',
                instructor: instructorUser._id,
                instructorName: 'John Doe',
                topics: [
                    'NFT Basics',
                    'Creating Digital Art',
                    'Minting Process',
                    'Marketing Strategies',
                    'Community Building'
                ],
                rating: 4.5,
                students: 9876,
                category: 'nft',
                isPublished: true
            },
            {
                title: 'Blockchain Security',
                description: 'Learn about cryptocurrency security, wallet protection, and common attack vectors.',
                longDescription: 'Understand the security aspects of blockchain technology. Learn how to protect your assets, identify vulnerabilities, and implement security best practices.',
                level: 'Advanced',
                duration: '6 weeks',
                price: '$179',
                icon: '🔒',
                instructor: instructorUser._id,
                instructorName: 'John Doe',
                topics: [
                    'Cryptography Basics',
                    'Wallet Security',
                    'Common Attacks',
                    'Security Best Practices',
                    'Smart Contract Auditing'
                ],
                rating: 4.8,
                students: 6543,
                category: 'security',
                isPublished: true
            }
        ])

        console.log('Creating exercises...')
        const exercises = await Exercise.insertMany([
            {
                title: 'What is Bitcoin?',
                description: 'Test your understanding of Bitcoin basics',
                type: 'mcq',
                category: 'Quiz',
                difficulty: 'Easy',
                course: courses[0]._id,
                question: 'What year was Bitcoin created?',
                options: [
                    { text: '2007', isCorrect: false },
                    { text: '2008', isCorrect: false },
                    { text: '2009', isCorrect: true },
                    { text: '2010', isCorrect: false }
                ],
                correctAnswer: '2009',
                explanation: 'Bitcoin was created by Satoshi Nakamoto in 2009.',
                points: 10,
                isActive: true
            },
            {
                title: 'Blockchain Fundamentals',
                description: 'Understanding blockchain structure',
                type: 'true-false',
                category: 'Quiz',
                difficulty: 'Easy',
                course: courses[0]._id,
                question: 'A blockchain is a distributed ledger that is completely decentralized.',
                correctAnswer: true,
                explanation: 'Yes, blockchain is a distributed ledger technology that operates in a decentralized manner.',
                points: 5,
                isActive: true
            },
            {
                title: 'Smart Contract Challenge',
                description: 'Write a simple Solidity function',
                type: 'programming',
                category: 'Programming',
                difficulty: 'Medium',
                course: courses[1]._id,
                question: 'Write a Solidity function that returns the sum of two numbers.',
                hints: ['Use the function keyword', 'Specify return type as uint'],
                explanation: 'In Solidity, you declare functions with the function keyword and specify the return type.',
                points: 25,
                timeLimit: 30,
                isActive: true
            },
            {
                title: 'Daily Trading Challenge',
                description: 'Calculate profit/loss percentage',
                type: 'numerical',
                category: 'Daily Challenge',
                difficulty: 'Medium',
                course: courses[2]._id,
                question: 'If you bought Bitcoin at $30,000 and sold at $35,000, what is your profit percentage?',
                correctAnswer: 16.67,
                explanation: 'Profit % = ((Sell Price - Buy Price) / Buy Price) × 100 = (5000/30000) × 100 = 16.67%',
                points: 15,
                isActive: true
            },
            {
                title: 'DeFi Yield Calculation',
                description: 'Calculate APY for yield farming',
                type: 'numerical',
                category: 'Mathematical',
                difficulty: 'Hard',
                course: courses[3]._id,
                question: 'If you stake 1000 tokens at 50% APY, how many tokens will you have after one year?',
                correctAnswer: 1500,
                explanation: 'With 50% APY: 1000 + (1000 × 0.50) = 1500 tokens',
                points: 20,
                isActive: true
            }
        ])

        // Create learning path
        console.log('Creating learning paths...')
        await LearningPath.create({
            title: 'Blockchain Developer Path',
            description: 'Complete journey from beginner to blockchain developer',
            icon: '🎯',
            difficulty: 'Beginner',
            estimatedDuration: '16 weeks',
            prerequisites: ['Basic programming knowledge', 'Understanding of JavaScript'],
            courses: [
                { course: courses[0]._id, order: 1, required: true },
                { course: courses[1]._id, order: 2, required: true },
                { course: courses[5]._id, order: 3, required: false }
            ],
            learningGoals: [
                'Understand blockchain fundamentals',
                'Build smart contracts with Solidity',
                'Deploy decentralized applications',
                'Implement security best practices'
            ],
            isPublished: true
        })

        console.log('✅ Database seeded successfully!')
        console.log(`   - ${courses.length} courses created`)
        console.log(`   - ${exercises.length} exercises created`)
        console.log(`   - 2 users created (admin & instructor)`)
        console.log(`   - 1 learning path created`)
        console.log('\nLogin credentials:')
        console.log('   Admin: admin@cryptlearn.com / password123')
        console.log('   Instructor: instructor@cryptlearn.com / password123')

        process.exit(0)
    } catch (error) {
        console.error('❌ Error seeding database:', error)
        process.exit(1)
    }
}

seedDatabase()
