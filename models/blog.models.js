import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
  blogTitle: { type: String, required: true },
  blogDescription: { type: String, required: true },
  blogImage: { type: String, required: true },
},{
  timestamps: true
});

const Blogs = mongoose.model("blogs", blogSchema );

export { Blogs };
