import {Router} from "express"
import { addCategoryController } from "../controllers/category.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const subCategoryRouter = Router()

subCategoryRouter.post("/create",verifyJWT,addCategoryController)

export {subCategoryRouter}