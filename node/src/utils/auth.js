import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const generateToken = (id) => {
    return jwt.sign({ id }, config.jwtSecret, {
        expiresIn: config.jwtExpire
    })
}

export const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = generateToken(user._id)

    res.status(statusCode).json({
        success: true,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            points: user.points,
            badges: user.badges
        }
    })
}
