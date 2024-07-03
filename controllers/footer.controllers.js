import { Footers } from "../models/footer.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const footerController = async (req, res) => {
    try {
      const { footerText } = req.body;
      const avatarLocalPath = req.file?.path;
      if (!avatarLocalPath) {
        return res.status(400).json({ error: "image not found" });
      }
  
      const avatar = await uploadOnCloudinary(avatarLocalPath);
      if (!avatar.url) {
        return res.status(400).json({ error: "cloudinary image link not found" });
      }
  
      const payload = await Footers.create({
        footerText,
        footerImage: avatar.url,
      });
  
      return res.status(200).json({ result: payload });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
  const getFooterController = async (req, res) => {
    try {
      const payload = await Footers.find();
      if (!payload.length) {
        return res.status(400).json({ error: "No data found" });
      }
      return res.status(200).json({ result: payload });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  const updateFooterController = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Handle file upload
      let imageUrl = req?.body?.logo;
      if (req.file) {
        const avatar = await uploadOnCloudinary(req?.file?.path);
        imageUrl = avatar.url;
      }
  
      const payload = await Footers.findByIdAndUpdate(
        id,
        { ...req.body, footerImage: imageUrl },
        { new: true }
      );
  
      if (!payload) return res.status(400).json({ error: "no data found" });
      return res.status(200).json({ result: payload });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "internal server error" });
    }
  };

  // Delete Heading Controller
const deleteFooterController = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = await Footers.findByIdAndDelete(id);
    if (!payload) return res.status(400).json({ error: "No data found" });
    return res.status(200).json({ result: payload });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export {footerController, getFooterController, updateFooterController, deleteFooterController}