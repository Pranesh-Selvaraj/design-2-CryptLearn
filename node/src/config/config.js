import dotenv from 'dotenv'

dotenv.config()

const config = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/cryptlearn',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    jwtExpire: process.env.JWT_EXPIRE || '30d',
    clientUrl: process.env.CLIENT_URL || 'http://localhost:3000'
}

export default config
