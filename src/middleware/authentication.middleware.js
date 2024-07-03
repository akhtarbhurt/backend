import JWT from "jsonwebtoken";
import User from "../models/user.models.js";

const secret = "Super@Dooper";

const checkforauthenticationcookie = async (req, res, next) => {
  const token = req.cookies?.["token"];
  if (!token) {
    console.log("Token not available");
    return res.status(401).json("Token was not available");
  } else {
    try {
      const payload = await JWT.verify(token, secret);
      let findobject = await User.findOne({ email: payload.email });

      if (!findobject) {
        return res.status(404).json("User not found");
      }

      req.user = findobject; // Attach the found user to req.user
      res.send(findobject);
      if (findobject.role === "normal" || findobject.role === "admin") {
        next();
      } else {
        return res.status(403).json("Unauthorized access");
      }
    } catch (err) {
      console.log("Error token not matched", err);
      res.send("error", err);
    }
  }
};

export { checkforauthenticationcookie };
