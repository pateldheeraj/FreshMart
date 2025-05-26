import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadImageClodinary from '../utils/cloudinary.js'

const uploadImageController = asyncHandler(async (req,res) => {
    const file = req?.file
    if(!file){
        throw new ApiError(400,"Unbale to Fetch File")
    }

    const uploadFile = await uploadImageClodinary(file)

    if(!uploadFile){
        throw new ApiError(400,"Unable to Upload File")
    }
    
    return res 
    .status(200)
    .json(new ApiResponse(200,uploadFile,"File Uploaded Successfyully"))
})

export {uploadImageController}