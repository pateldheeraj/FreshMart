import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { addAddressController, getAddressController } from "../controllers/address.controller.js"

const addressRouter = Router()

addressRouter.post("/create",verifyJWT,addAddressController)
addressRouter.get("/get",verifyJWT,getAddressController)

export default addressRouter