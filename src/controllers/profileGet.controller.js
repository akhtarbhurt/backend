const secret = "Super@Dooper"
import JWT from "jsonwebtoken"
import User from "../models/user.models.js"
const profilegetController = async (req,res) =>{
    const token = req.cookies?.["token"]
if(!token){
    return res.json({msg:"token not found"})
}
else{
try{

    const payload = await JWT.verify(token,secret)
    
    const findobject = await User.findById(payload.id)

    if(findobject.emailVerified){
        return res.json({user:findobject})
    }
    else{
        return res.json({msg:"token not verified"})
    }

}
catch(err){
    console.log("error",err)
}

}

}



export default profilegetController