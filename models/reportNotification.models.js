import mongoose from "mongoose";

const reportNotificationSchema = new mongoose.Schema({
  companyName: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  seen: {
    type: Boolean,
    default: false,
  },
  review: String,
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'firstclustersignup',
  },
  userName: String,
  action: String,
  reviewId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'reviews',
  }
});

const ReportNotification = mongoose.model("reportNotification", reportNotificationSchema);

export default ReportNotification;
