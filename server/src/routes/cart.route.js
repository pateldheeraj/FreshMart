import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { addItemToCartController, deleteCartProductController, getCartProductController, updateCartProductController } from "../controllers/cart.controller.js"

const cartRouter = Router()

cartRouter.post("/create",verifyJWT,addItemToCartController)
cartRouter.get("/get",verifyJWT,getCartProductController)
cartRouter.put("/update",verifyJWT,updateCartProductController)
cartRouter.delete("/delete",verifyJWT,deleteCartProductController)

export default cartRouter