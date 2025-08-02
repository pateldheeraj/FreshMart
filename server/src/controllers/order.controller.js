import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import OrderModel from "../models/order.model.js"
import CartProductModel from "../models/cartProduct.model.js"
import UserModel from "../models/user.model.js"
import mongoose from "mongoose"

const cashOnDeliveryOrderController = asyncHandler(async (req,res) => {
        const userId = req.user._id // auth middleware 
        const { list_items, totalAmt, addressId,subTotalAmt } = req.body 
        const payload = list_items.map(el => {
            return({
                userId : userId,
                orderId : `ORD-${new mongoose.Types.ObjectId()}`,
                productId : el.productId._id, 
                product_details : {
                    name : el.productId.name,
                    image : el.productId.image
                } ,
                paymentId : "",
                payment_status : "CASH ON DELIVERY",
                delivery_address : addressId ,
                subTotalAmt  : subTotalAmt,
                totalAmt  :  totalAmt,
            })
        })

        const generateOrder = await OrderModel.insertMany(payload)
        const removeCartItems = await CartProductModel.deleteMany({ userId : userId })
        const updateInUser = await UserModel.updateOne({ _id : userId }, { shopping_cart : []})

        return res 
        .status(200)
        .json(new ApiResponse(200,generateOrder,"Order Successfully"))
})

export {
    cashOnDeliveryOrderController
}