const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')
const CustomError = require('../errors')
const { crossOriginResourcePolicy } = require('helmet')

const getAllUsers = async (req, res)=>{
    const user = await User.find({role:"user"}).select('-password')
    res.status(StatusCodes.OK).json(user)
}

const getSingleUser = async (req, res)=>{
    const user = await User.findOne({_id:req.params.id}).select('-password')
    if(!user){
        throw new CustomError.NotFoundError('User not found')
    }
    res.status(StatusCodes.OK).json(user)
}

const showCurrentUser = async (req, res)=>{
    res.send('Show current user')
}


const updateUser = async (req, res)=>{
    res.send('Update user password')
}

const updateUserPassword = async (req, rse)=>{
    res.send("Update user password")
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}