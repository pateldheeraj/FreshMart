import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { createProductController, getProductController } from "../controllers/product.controller.js"

const productRouter = Router()

productRouter.post("/create",verifyJWT,createProductController)
productRouter.post('/get',getProductController)

export {productRouter}