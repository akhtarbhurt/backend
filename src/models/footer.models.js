import mongoose, { Schema } from "mongoose";

const footerSchema = new Schema({
    footerImage:{
        type : String,
        required: true
    },
    footerText:{
        type : String,
        required: true
    },
},{
    timestamps: true
})

const Footers = mongoose.model("footer", footerSchema)

export {Footers} 