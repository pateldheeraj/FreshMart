import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { addAddressController, disableAddressController, getAddressController, updateAddressController } from "../controllers/address.controller.js"

const addressRouter = Router()

addressRouter.post("/create",verifyJWT,addAddressController)
addressRouter.get("/get",verifyJWT,getAddressController)
addressRouter.put("/update",verifyJWT,updateAddressController)
addressRouter.put("/disable",verifyJWT,disableAddressController)

export default addressRouter