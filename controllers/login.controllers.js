import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import User from "../models/user.models.js";
const secret = "Super@Dooper";

const handlelogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let usrdata = await User.findOne({ email: email });

    if (usrdata) {
      if (usrdata.status === 'blocked') {
        return res.status(403).json({ message: "User is blocked" });
      }

      bcrypt.compare(password, usrdata.password, (err, response) => {
        if (response) {
          const payload = {
            id: usrdata._id,
            email: usrdata.email,
          };
          const token = JWT.sign(payload, secret);
          res.cookie("token", token, { httpOnly: true });

          return res.status(200).json({
            message: "Successfully logged in",
            user: usrdata,
          });
        } else {
          return res.status(400).json({ message: "The password is incorrect" });
        }
      });
    } else {
      return res.status(400).json({ message: "Incorrect email/password" });
    }
  } catch (error) {
    return res.status(400).json({ error: "No record found" });
  }
};

export default handlelogin;
