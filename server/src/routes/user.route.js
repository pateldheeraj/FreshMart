import {Router} from "express"
import { loginUserController, registerUserController, verifyEmailController ,updateUserAvatar,logoutUserController} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import upload from '../middlewares/multer.middleware.js'


const userRouter = Router()

userRouter.post('/register',registerUserController)
userRouter.post('/verify-email',verifyEmailController)
userRouter.post('/login',loginUserController)
userRouter.post('/logout',verifyJWT,logoutUserController
)
userRouter.put("/update-avatar",verifyJWT,upload.single('avatar'),updateUserAvatar)

export {userRouter}