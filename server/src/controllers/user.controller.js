import UserModel from "../models/user.model.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import sendEmail from "../utils/sendEmail.js";
import {verifyEmailTemplete} from "../utils/verifyEmailTemplete.js"

const registerUserController = asyncHandler( async (req,res) => {

    const {name,email,password} = req.body

    if(!name || !email || !password){
        throw new ApiError(400,"Please Provide name ,email and password")
    }

    const user = await UserModel.findOne({email})

    if(user){
        throw new ApiError(400,"User already exists")
    }

    const newUser = new UserModel({
        name,
        email,
        password
    })

    const save = await newUser.save()

    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email/?code=${save?._id}`
    
    const verifyEmail = await sendEmail({
        sentTo: email,
        subject: "Verify Email from FreshMart",
        html : verifyEmailTemplete({
            name,
            url : verifyEmailUrl
        })
    })

    return res
    .status(200)
    .json(new ApiResponse(201,save,"User Registerd Successfully"))
} )

export {registerUserController}