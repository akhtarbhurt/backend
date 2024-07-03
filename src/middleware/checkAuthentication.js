import JWT from "jsonwebtoken";
import User from "../models/user.models.js";
const secret = "Super@Dooper";

export const checkAuthentication = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const payload = await JWT.verify(token, secret);
    const user = await User.findOne({ email: payload.email });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const checkAdminRole = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

export const checkUserRole = (req, res, next) => {
  if (req.user.role !== "normal") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
