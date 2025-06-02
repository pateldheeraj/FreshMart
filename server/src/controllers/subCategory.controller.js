import SubCateoryModel from "../models/subCategory.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addSubCategoryController = asyncHandler(async (req,res) => {

    const {name , image , category} = req.body

    if(!name && !image && !category[0]){
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

const getSubCategoryController = asyncHandler(async (req, res) => {
  try {
    const subcategory = await SubCateoryModel.find()
      .sort({ createdAt: -1 })
      .populate('category');

    if (!subcategory) {
      throw new ApiError(400, "Unable to fetch");
    }

    return res.status(200).json(
      new ApiResponse(200, subcategory, "SubCategory Fetch Successfully")
    );
  } catch (error) {
    console.error("Error fetching subcategories:", error); // Log the real error
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

export {addSubCategoryController,getSubCategoryController}