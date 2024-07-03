import mongoose, { Schema } from "mongoose";

const clientSchema = new Schema({
  clientHeading: { type: String, required: true },
  reviewHeading: { type: String, required: true },
  reviewText: { type: String, required: true },
  reviewImage: { type: String, required: true },
},{
  timestamps: true
});

const Client = mongoose.model("clients", clientSchema);

export { Client };
