import JWT from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/user.models.js";

const resetpassword = (req,res)=>{
const secret = process.env.JWT_SECRET_KEY
const {id, token} = req.params
const {password} = req.body

JWT.verify(token, secret, (err, decoded) => {
    if(err) {
        return res.json({Status: "Error with token"})
    } else {
        bcrypt.hash(password, 10)
        .then(hash => {
            User.findByIdAndUpdate({_id: id}, {password: hash})
            .then(u => res.send({Status: "Success"}))
            .catch(err => res.send({Status: err}))
        })
        .catch(err => res.send({Status: err}))
    }
})

}

export default resetpassword;