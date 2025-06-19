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

const getProductByCategoryController = asyncHandler(async (req,res) => {
    const {id} = req.body
    if(!id){
        throw new ApiError(400,"Please Provide CategoryId")
    }
    const product = await ProductModel.find({
        category : {
            $in : id
        }
    }).limit(15)

    return res 
    .status(200)
    .json(new ApiResponse(200,product,"Product FetchSuccessfully"))
})

const getProductByCategoryIdAndSubcategoryIdController = asyncHandler(async (req,res) => {

    const {categoryId , subCategoryId , page = 1,limit = 10} = req.body
    
    if(!categoryId || !subCategoryId){
        throw new ApiError(400,"Please provide category and subcategory id")
    }

    const skip = (page-1)*limit

    const [data,dataCount] = await Promise.all([
        ProductModel.find({
            category : {
                $in : categoryId
            },
            subCategory : {
                $in : subCategoryId
            },
        }).sort({createdAt : -1}).skip(skip).limit(limit)
        ,
        ProductModel.countDocuments({
            category : {
                $in : categoryId
            },
            subCategory : {
                $in : subCategoryId
            },
        })
    ])

    return res
    .status(200)
    .json(new ApiResponse(200,{
        data ,
        dataCount,
        limit,
        page
    },"Product Fetch Successfully"))

})

const getproductDeatilsController = asyncHandler(async (req,res) => {
    const {productId} = req.body
    if(!productId){
        throw new ApiError(400,"Product ID is Required")
    }
    const product = await ProductModel.find({_id : productId})
    if(!product){
        throw new ApiError(400,"Unbale to Fetch Product")
    }

    return res 
    .status(200)
    .json(new ApiResponse(200,product,"Product fetch Successfully"))
})

export{
    createProductController,
    getProductController,
    getProductByCategoryController,
    getProductByCategoryIdAndSubcategoryIdController,
    getproductDeatilsController,
}