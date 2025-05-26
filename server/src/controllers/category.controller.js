import CategoryModel from '../models/category.model.js'
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const addCategoryController = asyncHandler(async (req,res) => {
    const {name , image} = req.body 
    if(!name || !image){
        throw new ApiError(400,"Enter Required Field")
    }

    const addCategory = new CategoryModel({
        name,
        image
    }) 

    const saveCategory = await addCategory.save()

    if(!saveCategory){
        throw new ApiError(400,"Unable to create Category")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,saveCategory,"Category Created Successfully"))

})

const getCategoryController = asyncHandler(async (req,res) => {
    const data = await CategoryModel.find()
    return res
    .status(200)
    .json(new ApiResponse(200,data,"Category Fetch SuccessFully"))
})

export {addCategoryController,getCategoryController}