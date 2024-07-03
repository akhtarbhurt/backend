// import User from "../models/user.js";
import JWT from "jsonwebtoken"
import nodemailer from "nodemailer"
import User from "../models/user.models.js";
const secret = process.env.JWT_SECRET_KEY
const forgethandle = (req,res) =>{
  const {email} = req.body;
  console.log("recivedobject",email)
      User.findOne({email: email})
      .then(user => {
          if(!user) {
            console.log("user not found")
              return res.send({Status: "User not existed"})
          } 
          const token = JWT.sign({id: user._id,email:user.email}, secret)
          console.log("token recived after")


          var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "06c825a0521772",
              pass: "5e823ce520c012"
            }
          });
    
            const mailOptions = {
              from: 'muhammadriyansadiq786@gmail.com',
              to:user.email,
              subject: 'Reset Password Link',
              html: `<p>Click <a href="http://localhost:5173/resetpassword/${user._id}/${token}">here</a> to reset your password</p>`
            }
            
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log("errfromtransporter",error);
              } else {
                return res.send({ Status: "Success", userId: user._id, token: token });
              }
            })

      })
      .catch(err => {
        console.error("Error:", err);
        res.status(404).json({ error: "User not found", details: err });
    });

}


export default forgethandle