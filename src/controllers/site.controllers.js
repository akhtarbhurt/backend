import { SiteConfig } from "../models/site.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"; // Ensure correct import path

const siteControllers = async (req, res) => {
  try {
    const { siteName } = req.body;
    const files = req.files;

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({ error: "No images found" });
    }

    const uploadedImages = {};
    for (const fieldName in files) {
      const fileArray = files[fieldName];
      for (const file of fileArray) {
        const image = await uploadOnCloudinary(file.path);
        if (!image.url) {
          return res.status(400).json({ error: "Cloudinary image link not found" });
        }
        uploadedImages[fieldName] = image.url;
      }
    }

    const payload = await SiteConfig.create({
      siteName,
      siteLogo: uploadedImages.siteLogo,
      favicons: uploadedImages.favicons,
    });

    if (!payload) return res.status(400).json({ error: "Nothing has been found in images" });

    return res.status(200).json({ result: payload });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const updateSiteControllers = async (req, res) => {
  try {
    const { id } = req.params;
    const files = req.files;
    const updateData = { ...req.body };

    if (files) {
      for (const fieldName in files) {
        const fileArray = files[fieldName];
        for (const file of fileArray) {
          const image = await uploadOnCloudinary(file.path);
          if (image.url) {
            updateData[fieldName] = image.url;
          }
        }
      }
    }

    const payload = await SiteConfig.findByIdAndUpdate(id, updateData, { new: true });

    if (!payload) return res.status(400).json({ error: "Nothing has been found in images" });

    return res.status(200).json({ result: payload });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export { siteControllers, updateSiteControllers };
