import {Router} from "express"
import { addCategoryController, deleteCategoryController, getCategoryController, updateCategoryController } from "../controllers/category.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const categoryRouter = Router()

categoryRouter.post("/add-category",verifyJWT,addCategoryController)
categoryRouter.get("/get",verifyJWT,getCategoryController)
categoryRouter.put("/update",verifyJWT,updateCategoryController)
categoryRouter.delete("/delete",verifyJWT,deleteCategoryController)

export {categoryRouter}