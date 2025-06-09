import express from "express"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from "morgan"
import helmet from "helmet"
import { userRouter } from "./routes/user.route.js"
import errorHandler from "./middlewares/errorHandler.js"
import { categoryRouter } from "./routes/category.route.js"
import { uploadRouter } from "./routes/upload.route.js"
import { subCategoryRouter } from "./routes/subCategory.route.js"
import { productRouter } from "./routes/product.route.js"

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
app.use("/api/v1/category/",categoryRouter)
app.use("/api/v1/file/",uploadRouter)
app.use("/api/v1/subcategory/",subCategoryRouter)
app.use("/api/v1/product/",productRouter)
app.use(errorHandler);

export {app}