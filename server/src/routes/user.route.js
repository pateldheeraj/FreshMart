import {Router} from "express"
import { loginUserController, registerUserController, verifyEmailController } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const userRouter = Router()

userRouter.post('/register',registerUserController)
userRouter.post('/verify-email',verifyEmailController)
userRouter.post('/login',loginUserController)
userRouter.post('/logout',verifyJWT,loginUserController)

export {userRouter}