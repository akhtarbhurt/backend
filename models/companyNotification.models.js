
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  companyID: { type: mongoose.Schema.Types.ObjectId, ref: 'UserRegistration', required: true },
  message: { type: String, required: true },
  seen: { type: Boolean, default: false },
}, { timestamps: true });

const CompanyNotification = mongoose.model('CompanyNotification', notificationSchema);

export default CompanyNotification;
