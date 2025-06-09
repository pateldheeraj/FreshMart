import ProductModel from "../models/product.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createProductController = asyncHandler(async (req,res) => {
     const { 
     name, 
     image,
     category,
     subCategory, 
     unit, 
     stock,
     price,
     discount,
     description, 
     more_details } = req.body
 
     if(!name || !image[0] || !category[0] || !subCategory[0] || !unit || !price || !description){
         throw new ApiError(400,"Enter Required Field")
     }
     
     const product = new ProductModel({
             name, 
             image,
             category,
             subCategory,
             unit, 
             stock,
             price,
             discount,
             description, 
             more_details
     })
     const createProduct = await product.save()
 
     return res 
     .status(200)
     .json(new ApiResponse(200,createProduct,"Product Created Successfully"))
})

const getProductController = asyncHandler(async (req,res) => {

    let { page, limit, search } = req.body 

        if(!page){
            page = 1
        }

        if(!limit){
            limit = 10
        }

        const query = search ? {
            $text : {
                $search : search
            }
        } : {}

        const skip = (page - 1) * limit

        const [data,totalCount] = await Promise.all([
            ProductModel.find(query).sort({createdAt : -1 }).skip(skip).limit(limit).populate('category subCategory'),
            ProductModel.countDocuments(query)
        ])

    return res 
    .status(200)
    .json(new ApiResponse(200,{data,totalCount,totalNoPage : Math.ceil( totalCount / limit)},"Product fetch Successfully"))
})

export{
    createProductController,
    getProductController
}