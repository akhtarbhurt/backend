import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
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
  warningText: String
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
