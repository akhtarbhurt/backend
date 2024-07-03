import mongoose, { Schema } from "mongoose";

const generatedWarning = new Schema({
    warningMessage: {
        type: String
    },
    isWarningMessage:{
        type: Boolean,
        default: false
    }, 
    userID:{
        type: mongoose.Schema.Types.ObjectId
    }
})

const Generated = mongoose.model("generate", generatedWarning)

export {Generated}