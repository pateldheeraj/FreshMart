import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { createProductController, getProductByCategoryController, getProductController } from "../controllers/product.controller.js"

const productRouter = Router()

productRouter.post("/create",verifyJWT,createProductController)
productRouter.post('/get',getProductController)
productRouter.post('/get-product-by-category',getProductByCategoryController)

export {productRouter}