import {Router} from "express"
import { addCategoryController, getCategoryController } from "../controllers/category.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const categoryRouter = Router()

categoryRouter.post("/add-category",verifyJWT,addCategoryController)
categoryRouter.get("/get-category",verifyJWT,getCategoryController)

export {categoryRouter}