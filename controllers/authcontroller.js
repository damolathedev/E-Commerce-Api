const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const {attachCookiesToResponse} = require('../utils')



const register =async(req, res)=>{
    const {email,name,password} = req.body
    const emailAlreadyExist = await User.findOne({email})
    if(emailAlreadyExist){
        throw new CustomError.BadRequestError("Email already exist")
    }
    const isFirstUser = await (User.countDocuments({}) )=== 0
    const role = isFirstUser ? 'admin' : "user"

    const user = await User.create({name, email, password, role})
    const tokenUser = {name:user.name, id:user._id, role:user.role}
    attachCookiesToResponse(res, tokenUser)
    res.status(StatusCodes.CREATED).json({user:tokenUser})
}

const login = async(req, res)=>{
    const {password, email} = req.body
    if(!email || !password){
        throw new CustomError.BadRequestError("Please provide email and password")
    }
    const user =await User.findOne({email})
    if(!user){
        throw new CustomError.UnauthenticatedError("Invalid Credentials")
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError("Invalid credentials")
    }
    const tokenUser = {name:user.name, id:user._id, role:user.role}
    attachCookiesToResponse(res, tokenUser)
    res.status(StatusCodes.CREATED).json({user:tokenUser})
}

const logout= async(req, res)=>{
    res.cookie('token', 'logout',{
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({ msg: 'user logged out!'})
}

module.exports = {register, login, logout}