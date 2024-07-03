import mongoose, { Schema } from "mongoose";

const informationSchema = new Schema({
  serviceTitle: { type: String, required: true },
  description: { type: String, required: true },
  selectCategory: { type: String, required: true },
  siteLink: { type: String, required: true },
  infoImage: { type: String, required: true },
  status: { type: String, required: true },

},{
  timestamps: true
});

const Information = mongoose.model("information", informationSchema);

export { Information };
