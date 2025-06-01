import SubCateoryModel from "../models/subCategory.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const addSubCategoryController = asyncHandler(async (req,res) => {

    const {name , image , category} = req.body

    if(!name && !image && !category){
        throw new ApiError(400,"Invalid Values")
    }

    const createSubCategory = new SubCateoryModel({
        name,
        image,
        category
    }) 

    await createSubCategory.save()

    return res
    .status(200)
    .json(new ApiResponse(200,createSubCategory,"SubCategory selected successfully"))
})

export {addSubCategoryController}