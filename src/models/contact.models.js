import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
    contactEmail: {
        type: String,
        required: true,
    },
    contactPhone: {
        type: String,
        required: true,
    },
    contactAddress: {
        type: String,
        required: true,
    },
},{
    timestamps: true
})

const Contact = mongoose.model("contact", contactSchema)

export {Contact}