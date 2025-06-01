import CategoryModel from '../models/category.model.js'
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import SubCateoryModel from '../models/subCategory.model.js'
import ProductModel from '../models/product.model.js'

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
    const data = await CategoryModel.find().sort({createdAt : -1})
    return res
    .status(200)
    .json(new ApiResponse(200,data,"Category Fetch SuccessFully"))
})

const updateCategoryController = asyncHandler(async (req,res) => {
    const {_id , name , image} = req.body

    const update = await CategoryModel.updateOne({
        _id : _id
    },{
        name,
        image
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,update,"Category Updated Successfully"))
})

const deleteCategoryController = asyncHandler(async (req,res) => {

    const {_id} = req.body

    const isSubCategory = await SubCateoryModel.find({
        category : {
                "$in" : [ _id ]
            }
    }).countDocuments()
    const isProduct = await ProductModel.find({
        category : {
                "$in" : [ _id ]
            }
    }).countDocuments()

    if(isSubCategory > 0 || isProduct > 0){
        throw new ApiError(400,"Category is already in use can't delete")
    }

    await CategoryModel.deleteOne({
        _id
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,{},"Category Deleted Successfully"))
})

export {addCategoryController,getCategoryController,updateCategoryController,deleteCategoryController}