// const multer = require("multer")
import multer from "multer";
// const path = require("path");
import path from "path"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'../frontend/images'); // Ensure this path is correct
    },
    filename: function (req, file, cb) {
      // const fileName = `${Date.now()}-${file.originalname}`;
      // cb(null, fileName);
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
  });

  const upload = multer({ storage: storage })

  // module.exports = upload;
  export default upload