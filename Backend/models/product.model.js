import mongoose,{Schema} from "mongoose";

const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discountedPrice:{
        type:Number,
        default:0
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
const Product = mongoose.model("Product",productSchema)  // create a model from the schema
export default Product; // export the model
