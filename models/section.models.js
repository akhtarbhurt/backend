import mongoose, { Schema } from "mongoose";

const sectionSchema = new Schema({
  sectionHeading : { type: String, required: true },
  sectionText: { type: String, required: true },
  sectionButtonText: { type: String, required: true },
  sectionImage: { type: String, required: true },
},{
  timestamps: true
});

const Sections = mongoose.model("sections", sectionSchema);

export { Sections };
