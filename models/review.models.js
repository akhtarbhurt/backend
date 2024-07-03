import mongoose, { Schema, Types } from "mongoose";

const reviewSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  companyID: {
    type: Types.ObjectId,
    required: true,
    ref: 'companies',
  },
  userID: {
    type:  Types.ObjectId,
    required: true,
    ref: 'firstclustersignup', 
  },
  review: {
    type: String,
  },
  rating: {
    type: Number,
  },
},{
  timestamps: true
});

const Reviews = mongoose.model("reviews", reviewSchema);

export { Reviews };
