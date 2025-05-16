import {Router} from "express"
import { loginUserController,
        registerUserController,
        verifyEmailController,
        updateUserAvatar,
        logoutUserController,
        forgot_password_otp,
        updateUserDetails,
        verifyOtp,
        resetpassword,
        refreshTokenGen,
        getUserDetails} 
from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import upload from '../middlewares/multer.middleware.js'


const userRouter = Router()

userRouter.post('/register',registerUserController)
userRouter.post('/verify-email',verifyEmailController)
userRouter.post('/login',loginUserController)
userRouter.post('/logout',verifyJWT,logoutUserController
)
userRouter.put("/update-avatar",verifyJWT,upload.single('avatar'),updateUserAvatar)
userRouter.put("/update-user",verifyJWT,updateUserDetails)
userRouter.put("/forgot-password-otp",forgot_password_otp)
userRouter.put("/verify-forgot-password-otp",verifyOtp)
userRouter.put('/reset-password',resetpassword)
userRouter.post('/refresh-token',refreshTokenGen)
userRouter.get('/user-details',verifyJWT,getUserDetails)

export {userRouter}