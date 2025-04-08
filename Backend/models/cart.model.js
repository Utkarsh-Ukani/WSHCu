import mongoose,{Schema} from "mongoose";

const cartSchema = new Schema({
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
    ]
},{
    timestamps:true
})
const Cart = mongoose.model("Cart",cartSchema)  // create a model from the schema       
export default Cart; // export the model
