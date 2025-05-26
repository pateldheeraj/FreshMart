import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js"
import upload from '../middlewares/multer.middleware.js'
import { uploadImageController } from "../controllers/uploadImages.controller.js";

const uploadRouter = Router()

uploadRouter.post("/upload",verifyJWT,upload.single('image'),uploadImageController)

export {uploadRouter}