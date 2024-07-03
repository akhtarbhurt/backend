// const JWT = require("jsonwebtoken")
import JWT from "jsonwebtoken";
// const User = require("../models/user")
import User from "../models/user.models.js";
const secret = "Super@Dooper";



const restrictTo = async (req, res, next) => {
  const token = req.cookies?.["token"];
  if (!token) {
    return res.status(404).json({ msg: "token not found" });
  }

  try {
    const payload = await JWT.verify(token, secret);
    const user = await User.findOne({ email: payload.email });
    console.log("user founded in restriction", user);
    if (user.emailVerified) {
      return res.json({msg:user}).redirect("/").next();
    }
  } catch (err) {
    // If token verification fails, proceed to login
    console.log("Token verification failed", err);
    return next();
  }
};

export { restrictTo };

