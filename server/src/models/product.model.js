import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"provide product name"]
    },
    image:{
        type:Array,
        default:[]
    },
    categoryId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    }],
    subCategoryId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubCategory"
    }],
    unit:{
        type:String,
        default:""
    },
    stock:{
        type:Number,
        default:null
    },
    price:{
        type:Number,
        default:null
    },
    discount:{
        type:Number,
        default:null
    },
    discription:{
        type:String,
        default:""
    },
    more_details:{
        type:Object,
        default:{}
    },
    publish:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

const ProductModel = mongoose.model("Product",productSchema)

export default ProductModel