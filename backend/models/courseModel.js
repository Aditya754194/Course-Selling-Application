import mongoose from "mongoose";

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
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required: true
        }
    }
})

export const Course = mongoose.model("Course",courseSchema)