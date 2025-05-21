import express from "express"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from "morgan"
import helmet from "helmet"
import { userRouter } from "./routes/user.route.js"
import errorHandler from "./middlewares/errorHandler.js"

const app = express()

app.use(cors({
    credentials : true,
    origin : process.env.FRONTEND_URL
}))

app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : true
}))

app.use("/api/v1/user/",userRouter)
app.use(errorHandler);

export {app}