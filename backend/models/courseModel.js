import mongoose, { Types } from "mongoose";

const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        reauired:true,
    },
    description:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    image:{
        type:String,
        require:true,
    }
})

export const Course = mongoose.model("Course",courseSchema)