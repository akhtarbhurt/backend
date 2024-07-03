// const { Schema, model } = require("mongoose");
import { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    confirmpassword: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: "normal",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    Token: {
      type: String,
    },
    warnings: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      default: "unblock",
    },
  },
  { timestamps: true }
);

const User = model("firstclustersignup", userSchema);

// module.exports = User;
export default User;
