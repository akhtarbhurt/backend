import mongoose, { Mongoose, Schema } from "mongoose";

const reportSchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    review:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    warning:{
        type: Number,
        required: true
    },
    warningText:{
        type: String,
        required: true
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "firstclustersignup"
    }
})

const Reports = mongoose.model("report", reportSchema)

export {Reports}