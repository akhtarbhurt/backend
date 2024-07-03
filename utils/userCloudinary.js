import {v2 as cloudinaryUser} from "cloudinary"
import dotenv from "dotenv";
dotenv.config(); 
  

cloudinaryUser.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRETKEY,
  });

// module.exports = cloudinary;

export default cloudinaryUser;