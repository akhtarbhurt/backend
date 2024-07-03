import { Router, response } from "express";
  const router = Router();
  import User from "../models/user.models.js";
  import {handleregister} from "../controllers/user.auth.controllers.js"
  import handlelogin from "../controllers/login.controllers.js"
  import { handleUpdateregister } from "../controllers/user.auth.controllers.js";
  import  { checkforauthenticationcookie } from "../middleware/authentication.middleware.js"
  import logoutController from "../controllers/logout.controllers.js"
  import role from "../middleware/role.middleware.js";
  import signupSchema from "../validator/auth.validator.js"
  import validate from "../middleware/validate.middleware.js"
  import { restrictTo } from "../middleware/restrictTo.middleware.js";
  
import upload from "../middleware/uploadImg.middleware.js";

import forgethandle from "../controllers/forget.controller.js"
import resetpassword from "../controllers/resetPassword.controllers.js"
import contactrecaptcha from "../controllers/ContactCaptcha.controllers.js";
import profilegetController from "../controllers/profileGet.controller.js"
import contactpostrecaptcha from "../controllers/ContactCaptcha.controllers.js"
// register post
  router.post("/register",upload.single("profileImageURL"),validate(signupSchema),handleregister);
 
//register get
  router.get("/register",restrictTo)

  // login verify

router.get('/verify-email/:id/', async (req, res) => {
  const { id } = req.params;
  console.log("ideees from varification ",id)

  const user = await User.findById(id);
console.log("user from verify",user)

if(user){
    // Update the user's emailVerified field to true and remove the Token field
    user.emailVerified = true;
    user.Token = undefined; // Or you can use delete user.Token;

    // Save the updated user
    await user.save();

  res.status(200).json({ message: "verfied successfully" });

}

else{
  res.status(400).json({ message: "not verfied" });
}
});

// login post 

router.post("/login", handlelogin,(req,res)=>{
  res.json("loginsuccesfully")
});

 //login get

 router.get("/login", restrictTo);  

  router.post("/profile/:id",upload.single("profileImageURL"),handleUpdateregister);

 



  router.get("/",checkforauthenticationcookie,(req,res)=>{
    console.log("Inside / route");
    res.status(200).json("success")
  })


  router.get("/role",role);  



  router.get("/profile",profilegetController)


 

 



  // logout

  router.get('/logout', logoutController,(req,res)=>{
    console.log("logoutsuccessfully")
    res.json("logout successfully")
  });

  // forgetpassword
  router.post('/forgetpassword',forgethandle, (req, res) => {
    res.json("forget successfully")
    
  })



// reset post req
  router.post('/resetpassword/:id/:token',resetpassword, (req, res) => {
      res.json("password reseted successfully")
  })

  router.post('/contact',contactrecaptcha,(req,res)=>{
   res.json("recaptcha contact forme successfully submitted")

  }); 

  //contactquestion

  router.post('/contactquestion',contactpostrecaptcha,(req,res)=>{
    res.json("recaptcha contact forme successfully submitted")
 
   });

  // module.exports = router;
export default router