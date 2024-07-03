import mongoose, { Schema } from "mongoose";

const userNotificationSchema = new Schema({
    companyName: String,
    userID: mongoose.Types.ObjectId,
    text: String
},{
    timestamps: true
})

const UserNotification = mongoose.model('userNotification', userNotificationSchema)

export {UserNotification}