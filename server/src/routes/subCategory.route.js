import {Router} from "express"
import { addSubCategoryController, deleteSubCategoryController, getSubCategoryController, updateSubCategoryController} from "../controllers/subCategory.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const subCategoryRouter = Router()

subCategoryRouter.post("/create",verifyJWT,addSubCategoryController)
subCategoryRouter.post("/get",verifyJWT,getSubCategoryController)
subCategoryRouter.put("/update",verifyJWT,updateSubCategoryController)
subCategoryRouter.delete("/delete",verifyJWT,deleteSubCategoryController)

export {subCategoryRouter}