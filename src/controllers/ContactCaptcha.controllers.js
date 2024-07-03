import axios from "axios"


const contactrecaptcha = async (req,res)=>{
    console.log("POST /contact hit");
    try{
      const {token} = await req.body
      if(!token){
        return res.status(400).json("recaptcha is required")
      }
      const secretkey = "6Le1-dspAAAAABjSQcJTR-vRqv2jYrtm3T82NAWT"
      console.log("captcha body",token )
  
      const {data,status,statusText} = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secretkey}&response=${token}`)
  
  if(data.success){
    
    return res.status(202).json({ data, status,statusText })
  }
  
  else{
    return res.status(400).json({data,message:"invalid recaptcha"})
  
  }
  
      
    }
    catch(err){
      console.log("captcha error",err)
      return res.status(400).json("catcha does not send in backend",err)
    }
}


export default contactrecaptcha;