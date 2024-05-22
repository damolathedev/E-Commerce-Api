const jwt = require('jsonwebtoken')
require('dotenv').config()


const createJWT = ({payload})=>{
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
    return token
}

const isTokenValid = ({token})=>{
    return jwt.verify(token, precess.env.JWT_SECRET)
}

module.exports = {
    createJWT,
    isTokenValid
}