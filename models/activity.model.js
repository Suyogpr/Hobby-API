import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    class:{
        type:Number,
        required:true
    }

},{timestamps:true})

const Activity = mongoose.model('Activity',activitySchema);

export default Activity;