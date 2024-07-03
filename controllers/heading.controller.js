import { Headings } from "../models/heading.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Create Heading Controller
const headingController = async (req, res) => {
  try {
    const { mainHeading, mainText,  apnaConnectionHeading, apnaConnectionText } = req.body;
    const bgImageFile = req.file?.path;
    if (!bgImageFile) {
      return res.status(400).json({ error: "Image not found" });
    }

    const avatar = await uploadOnCloudinary(bgImageFile);
    if (!avatar.url) {
      return res.status(400).json({ error: "Cloudinary image link not found" });
    }

    const payload = await Headings.create({
      mainHeading,
      mainText,
      apnaConnectionHeading,
      apnaConnectionText,
      bgImage: avatar.url,
    });

    if (!payload) {
      return res.status(400).json({ error: "Error creating heading content" });
    }

    return res.status(200).json({ result: payload });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Get Heading Controller
const getHeadingController = async (req, res) => {
  try {
    const payload = await Headings.find();
    if (!payload.length) {
      return res.status(400).json({ error: "No data found" });
    }
    return res.status(200).json({ result: payload });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update Heading Controller
const updateHeadingController = async (req, res) => {
  try {
    const { id } = req.params;

    // Handle file upload
    let imageUrl = req?.body?.logo;
    if (req.file) {
      const avatar = await uploadOnCloudinary(req?.file?.path);
      imageUrl = avatar.url;
    }

    const payload = await Headings.findByIdAndUpdate(
      id,
      { ...req.body, bgImage: imageUrl },
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
const deleteHeadingController = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = await Headings.findByIdAndDelete(id);
    if (!payload) return res.status(400).json({ error: "No data found" });
    return res.status(200).json({ result: payload });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { headingController, getHeadingController, updateHeadingController, deleteHeadingController };
