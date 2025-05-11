import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    orderId:{
        type:String,
        required:[true,"provide orderID"],
        unique:true
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product"
    },
    product_details:{
        name:String,
        image:Array
    },
    payment_id:{
        type:String,
        default:""
    },
    payment_status:{
        type:String,
        default:""
    },
    delivery_address:{
        type:mongoose.Schema.Types.ObjectId,
        default:{}
    },
    delivery_status:{
        type:String,
        default:""
    },
    subTotalAmt:{
        type:Number,
        default:0
    },
    totalAmt:{
        type:Number,
        default:0
    },
    invoice_receipt:{
        type:String,
        default:""
    }
},{
    timestamps:true
})

const OrderModel = mongoose.model("Order",orderSchema)

export default OrderModel