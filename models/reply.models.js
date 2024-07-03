import mongoose, { Schema, Types } from "mongoose";
import { broadcast } from "../index.js"; // Import the broadcast function

const replySchema = new Schema({
  reviewID: {
    type: Types.ObjectId,
    required: true,
    ref: 'reviews',
  },
  userID: {
    type: Types.ObjectId,
    required: true,
   
  },
  text: {
    type: String,
    required: true,
  },
  isCompanyReply: {
    type: Boolean,
    required: true,
  }
}, {
  timestamps: true
});

const Reply = mongoose.model("Reply", replySchema);

export {Reply}