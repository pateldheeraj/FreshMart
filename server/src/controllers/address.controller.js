import UserModel from "../models/user.model.js";
import AddressModel from "../models/address.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addAddressController = asyncHandler(async (req,res) => {
    const {address_line,city,state,pincode,country,mobile} = req.body

    const createAddress = new AddressModel({
        address_line,
        city,
        state,
        pincode,
        country,
        mobile,
        userId : req.user?._id
    })

    const save = await createAddress.save()

    await UserModel.findByIdAndUpdate(req.user?._id,{
       $push : {
         address_details : save._id
       }
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,createAddress,"Address Created Successfully"))
})

const getAddressController = asyncHandler(async (req,res) => {
    const userId = req.user?._id

    const data = await AddressModel.find({userId})

    return res 
    .status(200)
    .json(new ApiResponse(200,data,"Address Fetch Successfully"))
})

const updateAddressController = asyncHandler(async (req,res)=> {
    const userId = req.user?._id
    const {_id,address_line,city,state,pincode,country,mobile} = req.body

    const updateAddress = await AddressModel.updateOne({_id : _id, userId : userId},{
        address_line,
        city,
        state,
        pincode,
        country,
        mobile,
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,updateAddress,"Address Updated Successfully"))
})

const disableAddressController = asyncHandler(async (req,res)=> {
    const userId = req.user?._id
    const {_id} = req.body

    const disableAddress = await AddressModel.updateOne({_id : _id, userId : userId},{
        status : false
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,disableAddress,"Address disabled Successfully"))
})

export{
    addAddressController,
    getAddressController,
    updateAddressController,
    disableAddressController
}