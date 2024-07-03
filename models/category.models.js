import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    category:{
        type : String,
        required: true
    },
    catImage:{
        type : String,
        required: true
    },
},{
    timestamps: true
})

const Category = mongoose.model("category", categorySchema)

export {Category} 