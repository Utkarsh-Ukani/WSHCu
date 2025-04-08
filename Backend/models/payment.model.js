import mongoose,{Schema} from "mongoose";

const paymentSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    order:{
        type:Schema.Types.ObjectId,
        ref:"Order",
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    method:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["pending","completed","failed"],
        default:"pending"
    }
},{
    timestamps:true
})
const Payment = mongoose.model("Payment",paymentSchema)  // create a model from the schema
export default Payment; // export the model
