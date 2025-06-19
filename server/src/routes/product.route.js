import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { createProductController, getProductByCategoryController, getProductByCategoryIdAndSubcategoryIdController, getProductController, getproductDeatilsController } from "../controllers/product.controller.js"

const productRouter = Router()

productRouter.post("/create",verifyJWT,createProductController)
productRouter.post('/get',getProductController)
productRouter.post('/get-product-by-category',getProductByCategoryController)
productRouter.post('/get-product-by-categoryId-subCategoryId',getProductByCategoryIdAndSubcategoryIdController)
productRouter.post('/get-product-by-id',getproductDeatilsController)


export {productRouter}