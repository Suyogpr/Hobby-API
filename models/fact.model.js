import mongoose from "mongoose";

const factSchema = new mongoose.Schema(
    {
        fact:{
            type:String,
            required:true,
        },

        activity:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Activity',
            required:true
        }
    },{timestamps:true}
);

const Fact = mongoose.model("Fact",factSchema)

export default Fact;