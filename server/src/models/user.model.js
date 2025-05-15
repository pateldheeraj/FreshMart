import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new  mongoose.Schema({
    name:{
        type:String,
        required: [true,"provide name"]
    },
    email:{
        type:String,
        required: [true,"provide email"],
        unique : true
    },
    password:{
        type:String,
        required : [true,"provide password"]
    },
    avatar:{
        type: String,
        default:""
    },
    mobile:{
        type:Number,
        default:null
    },
    refresh_token:{
        type:String,
        default:""
    },
    verify_email:{
        type:Boolean,
        default:false
    },
    last_login_date:{
        type:Date,
        default:""
    },
    status:{
        type: String,
        enum : ["Active","Inactive","Suspended"],
        default : "Active"
    },
    address_details:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Address'
        }
    ],
    shopping_cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'CartProduct'
        }
    ],
    order_history:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Order'
        }
    ],
    forgot_password_otp:{
        type:Number,
        default:null
    },
    forgot_password_expiry:{
        type:Date,
        default:""
    },
    role:{
        type:String,
        enum:["admin" , "user"],
        default:"user"
    }

},{
    timestamps:true
})

userSchema.pre("save",async function(next) {

    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password,10)
    next()

})

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            name : this.name,
            email : this.email,
        },
         process.env.ACCESS_TOKEN_SECRET,
         {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
         }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            name : this.name,
            email : this.email,
        },
         process.env.REFRESH_TOKEN_SECRET,
         {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
         }
    )
}


const UserModel = mongoose.model("User",userSchema)

export default UserModel