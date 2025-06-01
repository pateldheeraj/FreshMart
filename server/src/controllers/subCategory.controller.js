import SubCateoryModel from "../models/subCategory.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addSubCategoryController = asyncHandler(async (req,res) => {

    const {name , image , categoryId} = req.body

    if(!name && !image && !categoryId){
        throw new ApiError(400,"Invalid Values")
    }
    
    const createSubCategory = new SubCateoryModel({
        name,
        image,
        categoryId
    }) 

    await createSubCategory.save()

    return res
    .status(200)
    .json(new ApiResponse(200,createSubCategory,"SubCategory selected successfully"))
})

export {addSubCategoryController}