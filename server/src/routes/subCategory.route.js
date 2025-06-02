import {Router} from "express"
import { addSubCategoryController, getSubCategoryController} from "../controllers/subCategory.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const subCategoryRouter = Router()

subCategoryRouter.post("/create",verifyJWT,addSubCategoryController)
subCategoryRouter.post("/get",verifyJWT,getSubCategoryController)

export {subCategoryRouter}