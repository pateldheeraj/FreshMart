import UserModel from "../models/user.model.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import sendEmail from "../utils/sendEmail.js";
import {verifyEmailTemplete} from "../utils/verifyEmailTemplete.js"
import uploadImageClodinary from "../utils/cloudinary.js";
import { generateOtp } from "../utils/generateOtp.js";
import {forgotPassTemp} from "../utils/forgotPasswordEmailTemplate.js"
import jwt from "jsonwebtoken"


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

const verifyEmailController = asyncHandler( async (req,res) => {
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

const loginUserController = asyncHandler( async (req,res) => {
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

const logoutUserController = asyncHandler( async (req,res) => {
    await UserModel.findByIdAndUpdate(req.user?._id,{
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

const updateUserAvatar = asyncHandler ( async ( req,res ) => {
    
    const image =  await uploadImageClodinary(req.file)
    if(!image){
        throw new ApiError(401,"Unable to Upload Image")
    }
    await UserModel.findByIdAndUpdate(req.user?._id,{
        avatar: image.url
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,{_id : req.user?._id,avatar : image.url}))

})

const updateUserDetails = asyncHandler( async (req,res) => {
    const { name , email , mobile , password} = req.body

    const updateUser = await UserModel.updateOne({ _id : req.user?._id},{
            ...(name && { name : name }),
            ...(email && { email : email }),
            ...(mobile && { mobile : mobile }),
            ...(password && { password : password})
        })

        return res
        .status(200)
        .json(new ApiResponse(202,updateUser,"User Details Updated Successfully"))
})

const forgot_password_otp = asyncHandler( (async (req,res) => {
    const {email} = req.body

    if (!email) {
        throw new ApiError(400,"Please provide Email")
    }

    const user = await UserModel.findOne({email})

    if(!user){
        throw new ApiError(401,"User not registered !! Please Create new account")
    }

    const name = user.name
    const otp = generateOtp()
    
    const expireTime = new Date() + 60 * 60 * 1000 // 1hr

    await UserModel.findByIdAndUpdate(user._id,{
        forgot_password_otp : otp,
        forgot_password_expiry : new Date(expireTime).toISOString()
    })

    await sendEmail({
        sentTo : email,
        subject : "Forgot Password from FreshMart",
        html : forgotPassTemp(name,otp)
    })


    return res 
    .status(200)
    .json(new ApiResponse(202,{},"Email sent successfully , Please Check your mail"))

}))

const verifyOtp = asyncHandler( async (req,res) => {
    const {email,otp} = req.body

    if(!email || !otp){
        throw new ApiError(401,"Please Enter Required Field Email and OTP")
    }
    
    const user = await UserModel.findOne({email})

    if(!user){
        throw new ApiError(402,"user not found with this email")
    }

    const currentTime = new Date().toISOString()

    if(user?.forgot_password_expiry < currentTime){
        throw new ApiError(401, "Otp is expired")
    }
    
    if( otp.toString() !== user?.forgot_password_otp.toString()){
        throw new ApiError(401,"Invalid Otp")
    }

    const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
                 
                forgot_password_otp : "",
                forgot_password_expiry: ""
                
    })

    return res
    .status(200)
    .json(new ApiResponse(202,{},"Otp verified Successfully"))

})

const resetpassword = asyncHandler( async (req, res ) => {
    const {email,newPassword,confirmPassword} = req.body
    if(!email || !newPassword || !confirmPassword){
        throw new ApiError(401,"Please enter Required Field Email, New and Confirm Password")
    }

    const user = await UserModel.findOne({email})

    if(!user){
        throw new ApiError(402,"User not Found With This Email")
    }

    if(newPassword !== confirmPassword){
        throw new ApiError(404,"Both password must be same")
    }

    user.password = newPassword
    await user.save()

    return res 
    .status(200)
    .json(new ApiResponse(202,{},"Password Updated Successfully"))
})

const refreshTokenGen = asyncHandler(async (req,res) => {
    const refreshToken = req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1]

    if(!refreshToken){
        throw new ApiError(401,"Refersh Token not Found")
    }

    const verifyToken = await jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)

    if(!verifyToken){
        throw new ApiError(400,"Token is expired")
    }

    const userId = verifyToken?._id

    const user = await UserModel.findById(userId)

    const newAccessToken =  await user.generateAccessToken()

    if(!newAccessToken){
        throw new ApiError(400,"Unable to Generate Accesstoken")
    }

    const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }

    return res 
    .status(200)
    .cookie("newAccessToken",newAccessToken,cookiesOption)
    .json(new ApiResponse(200,{accessToken : newAccessToken}," new AccessToken generated"))

})

const getUserDetails = asyncHandler(async (req ,res) => {
    const userId = req.user?._id

    console.log(userId)

    const user = await UserModel.findById(userId).select('-password -refresh_token')
    if(!user){
        throw new ApiError(401,"Unable to fetch User")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,user,"User Fetch Successfully"))
})

export {
    registerUserController,
    loginUserController,
    logoutUserController,
    verifyEmailController,
    updateUserAvatar,
    forgot_password_otp,
    updateUserDetails,
    verifyOtp,
    resetpassword,
    refreshTokenGen,
    getUserDetails
}