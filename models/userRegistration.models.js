import mongoose, { Schema } from "mongoose";

const userRegSchema = new Schema({
    logo: {
        type: String,
        trim: true
    },
    companyName: {
        type: String,
        trim: true
    },
    personName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    industry: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    founded: {
        type: String,
        trim: true
    },
    startTime: {
        type: String,
        trim: true
    },
    endTime: {
        type: String,
        trim: true
    },
    instagram: {
        type: String,
        trim: true
    },
    facebook: {
        type: String,
        trim: true
    },
    linkedin: {
        type: String,
        trim: true
    },
    siteLink: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    verificationToken: {
        type: String
    },
    tokenExpiration: {
        type: String
    },
    progressbar: {
        type: Number,
        default: 0
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
}, {
    timestamps: true
});

const UserRegistration = mongoose.model("userRegistered", userRegSchema);

export { UserRegistration };
