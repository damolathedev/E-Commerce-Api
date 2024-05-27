const jwt = require('jsonwebtoken')
require('dotenv').config()


const createJWT = ({payload})=>{
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
    return token
}

const isTokenValid = ({token})=>{
    return jwt.verify(token, precess.env.JWT_SECRET)
}

const attachCookiesToResponse = (res, user)=>{
    const token = createJWT({payload:user})
    const oneday = 1000 * 60 * 60 * 24
    res.cookie(token, { expires: new Date(Date.now() + oneday), httpOnly: true })
}

module.exports = {
    createJWT,
    isTokenValid,
    attachCookiesToResponse
}