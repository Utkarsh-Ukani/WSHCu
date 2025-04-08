import mongoose,{Schema} from "mongoose";

const coItemSchema = new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})
const CoItem = mongoose.model("CoItem",coItemSchema,"coitems")  // create a model from the schema 
export default CoItem; // export the model