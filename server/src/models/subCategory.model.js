import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    image:{
        type:String,
        default:""
    },
    categoryId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    }],
},{
    timestamps:true
})

const SubCateoryModel = mongoose.model("SubCategory",subCategorySchema)

export default SubCateoryModel