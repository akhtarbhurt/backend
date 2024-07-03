import { Information } from "../models/addCompany.models.js";
import { Category } from "../models/category.models.js";
import { Headings } from "../models/heading.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Create Heading Controller
const informationController = async (req, res) => {
  try {
    const {serviceTitle, description,  selectCategory, siteLink,  status } = req.body;
    const bgImageFile = req.file?.path;
    if (!bgImageFile) {
      return res.status(400).json({ error: "Image not found" });
    }

    const avatar = await uploadOnCloudinary(bgImageFile);
    if (!avatar.url) {
      return res.status(400).json({ error: "Cloudinary image link not found" });
    }
    const payload = await Information.create({
        serviceTitle,
        description,
        selectCategory ,
        siteLink,
      infoImage: avatar.url,
      status
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
const getInformationController = async (req, res) => {
  try {
    const payload = await Information.find();
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
const updateInformationController = async (req, res) => {
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
const deleteInformationController = async (req, res) => {
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

export { informationController, getInformationController, updateInformationController, deleteInformationController };
