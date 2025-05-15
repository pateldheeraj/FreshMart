import UserModel from "../models/user.model.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import sendEmail from "../utils/sendEmail.js";
import {verifyEmailTemplete} from "../utils/verifyEmailTemplete.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const generateAccessAndRefreshToken = async (userId) => {
    const user = await UserModel.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    
    user.refresh_token = refreshToken
    await user.save({ validateBeforeSave: false })
    
    return {
         accessToken,
         refreshToken
    }

}

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

const verifyEmailController = asyncHandler(async (req,res) => {
    const {code} = req.body

    const user = await UserModel.findById(code)

    if(!user){
        throw new ApiError(400,"Unable to verify Email")
    }

    const verifiedUser = await UserModel.findByIdAndUpdate(code,{
        verify_email : true
    })

    return res
    .status(200)
    .json(new ApiResponse(201,verifiedUser,"User Verified Successfully"))
})

const loginUserController = asyncHandler(async (req,res) => {
    const {email,password} = req.body

    if(!email || !password){
        throw new ApiError(400,"Please Enter Email or Password")
    }

    const user = await UserModel.findOne({email : email})
    
    if(!user){
        throw new ApiError(402,"User Does not Exists")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(402,"Invalid user credentials")
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user?._id)
     console.log(accessToken,refreshToken);
 
    const options = {
        httpsOnly : true,
        secure : true,
        sameSite : "None"
    }

    return res
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .status(200)
    .json(new ApiResponse(202,{accessToken,refreshToken},"User login Sucessfully"))

})

const logoutUserController = asyncHandler(async (req,res) => {
    await UserModel.findByIdAndUpdate(userId,{
        $unset : {refresh_token:1}
    },{new : true})

    const options = {
        httpsOnly : true,
        secure : true,
        sameSite : "None"
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(201,{},"Logout Successfully"))
})

export {registerUserController,loginUserController,verifyEmailController}