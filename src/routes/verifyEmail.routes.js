import User from "../models/user.models";


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

  