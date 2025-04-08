import mongoose,{Schema} from "mongoose";

const orderSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    products:[
        {
            type:Schema.Types.ObjectId,
            ref:"CoItem",
            required:true
        }
    ],
    address:{
        type:Schema.Types.ObjectId,
        ref:"Address",
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["pending","shipped","delivered","cancelled"],
        default:"pending"
    }
},{
    timestamps:true
})
const Order = mongoose.model("Order",orderSchema)  // create a model from the schema
export default Order; // export the model