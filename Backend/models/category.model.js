import mongoose,{Schema} from "mongoose";

const categorySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Category = mongoose.model("Category",categorySchema)  // create a model from the schema
export default Category; // export the model