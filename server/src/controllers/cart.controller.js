import CartProductModel from "../models/cartProduct.model.js";
import UserModel from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addItemToCartController = asyncHandler(async (req,res) => {
    const userId = req.user?._id
    const {productId} = req.body

    if (!productId) {
        throw new ApiError(402,"Please Provide ProductId")
    }

    const isAdded = await CartProductModel.findOne({productId,userId})
    if (isAdded) {
        throw new ApiError(200,"Product Already Added to Cart")
    }

    const addToCart = new CartProductModel({
        productId,
        userId,
        quantity : 1
    })

    const save = await addToCart.save()

    const updateCartInProduct = await UserModel.updateOne({_id : userId},{
        $push : {
            shopping_cart : save._id
        }
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,save,"Product Added to Cart"))
})

const getCartProductController = asyncHandler(async (req,res) => {
    const userId = req.user._id

    const cartProducts = await CartProductModel.find({userId}).populate("productId")
    if (!cartProducts) {
        throw new ApiError(400,"No Items In Cart")
    }
    return res 
    .status(200)
    .json(new ApiResponse(200,cartProducts,"Cart Fetch Successfully"))
})

const updateCartProductController = asyncHandler(async (req,res) => {
     const userId = req.user._id
     const {qty,id} = req.body

     if(!qty || !id){
        throw new ApiError(400,"Please Provide Required Values")
     }

     const updatedCart = await CartProductModel.updateOne({_id : id , userId : userId},{
        quantity : Number(qty)
     })

     return res 
     .status(200)
     .json(new ApiResponse(200,updatedCart,"Cart Updated Successfully"))
})

const deleteCartProductController = asyncHandler(async (req,res) => {
     const {_id} = req.body

     if(!_id){
        throw new ApiError(400,"Please Provide Required Values")
     }

     const deleteCart = await CartProductModel.deleteOne({_id})

     return res 
     .status(200)
     .json(new ApiResponse(200,deleteCart,"Item removed successfully"))
})

export{
    addItemToCartController,
    getCartProductController,
    updateCartProductController,
    deleteCartProductController
}