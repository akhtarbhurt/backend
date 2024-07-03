import express from 'express';
import cookieParser from 'cookie-parser';
import JWT from 'jsonwebtoken';
import User from '../models/user.models.js';
const app = express();
const secret = "Super@Dooper";
app.use(cookieParser());

const role = async (req, res) => {
   
    const token = req.cookies?.["token"]

try{
    const payload = await JWT.verify(token,secret)
    let findobject = await User.findOne({email:payload.email})
        console.log("payload matched",findobject)
        if(findobject.role === "normal"){

            res.json({msg:findobject.role})
            return res.redirect("/")
        }
        if(findobject.role === "admin"){

            res.json({msg:findobject.role})
            return res.redirect("/dashboard")
        }
}
catch(err){
    console.log(err)
}
    
};
 
  export default role