import {Router} from "express"
import { addSubCategoryController} from "../controllers/subCategory.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const subCategoryRouter = Router()

subCategoryRouter.post("/create",verifyJWT,addSubCategoryController)

export {subCategoryRouter}