import mongoose,{Schema} from "mongoose";

const addressSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    street:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    zip:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true
})
const Address = mongoose.model("Address",addressSchema)  // create a model from the schema
export default Address; // export the model
