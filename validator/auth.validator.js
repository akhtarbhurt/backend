// const {z} = require("zod");

import {z} from "zod"

const signupSchema = z.object({
    name: z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"name must be atleast 3 char"})
    .max(255,{message:"name must not be greater than 255 char"}),
    email: z
    .string({required_error:"email is required"})
    .trim()
    .min(3,{message:"email must be atleast 3 char"})
    .max(255,{message:"email must not be greater than 255 char"}),
    password: z
    .string({required_error:"password is required"})
    .trim()
    .min(6,{message:"password must be atleast 6 char"})
    .max(155,{message:"password must not be greater than 155 char"}),
    confirmpassword: z
    .string({required_error:"confirmpassword is required"})
})
.refine(data => data.password === data.confirmpassword,{
    message:"password not matched",
    path:"confirmpassword"
})

// module.exports = signupSchema

export default signupSchema