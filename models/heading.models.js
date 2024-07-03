import mongoose, { Schema } from "mongoose";

const headingSchema = new Schema({
  mainHeading: { type: String, required: true },
  mainText: { type: String, required: true },
  apnaConnectionHeading: { type: String, required: true },
  apnaConnectionText: { type: String, required: true },
  bgImage: { type: String, required: true },
},{
  timestamps: true
});

const Headings = mongoose.model("Headings", headingSchema);

export { Headings };
