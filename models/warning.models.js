import mongoose, { Schema } from "mongoose";

const warningSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'firstclustersignup', // Ensure this is the correct model name for users
    },
    warningText: {
        type: String,
        required: true
    },
    warningNumber: {
        type: Number,
        required: true
    },
    reviewId: { // Changed to match the naming convention
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "reviews" // Ensure this is the correct model name for reviews
    }
});

const Warning = mongoose.model("Warning", warningSchema); // Capitalized model name for consistency

export { Warning };
