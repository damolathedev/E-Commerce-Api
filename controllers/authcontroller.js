const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const {createJWT} = require('../utils')



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
    const token = createJWT({payload:tokenUser})

    res.status(StatusCodes.CREATED).json({user:tokenUser, token})
}

const login = async(req, res)=>{
    res.send("Login user")
}

const logout= async(req, res)=>{
    const user = await User.find({})
    res.status(StatusCodes.OK).json(user)
}

module.exports = {register, login, logout}