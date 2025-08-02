import { cashOnDeliveryOrderController } from "../controllers/order.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {Router} from "express"

const orderRouter = Router()

orderRouter.post("/cash-on-delivery",verifyJWT,cashOnDeliveryOrderController)

export default orderRouter