import { Blogs } from "../models/blog.models.js";
import { Headings } from "../models/heading.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Create Heading Controller
const blogsController = async (req, res) => {
  try {
    const { blogTitle, blogDescription,   } = req.body;
    const bgImageFile = req.file?.path;
    if (!bgImageFile) {
      return res.status(400).json({ error: "Image not found" });
    }

    const avatar = await uploadOnCloudinary(bgImageFile);
    if (!avatar.url) {
      return res.status(400).json({ error: "Cloudinary image link not found" });
    }

    const payload = await Blogs.create({
      blogTitle,
      blogDescription,
      blogImage: avatar.url,
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
const getBlogsController = async (req, res) => {
  try {
    const payload = await Blogs.find();
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
const updateBlogsController = async (req, res) => {
  try {
    const { id } = req.params;

    // Handle file upload
    let imageUrl = req.body.logo;
    if (req.file) {
      const avatar = await uploadOnCloudinary(req.file.path);
      imageUrl = avatar.url;
    }

    const payload = await Blogs.findByIdAndUpdate(
      id,
      { ...req.body, blogImage: imageUrl },
      { new: true }
    );

    if (!payload) return res.status(400).json({ error: "No data found" });
    return res.status(200).json({ result: payload });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Heading Controller
const deleteBlogsController = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = await Blogs.findByIdAndDelete(id);
    if (!payload) return res.status(400).json({ error: "No data found" });
    return res.status(200).json({ result: payload });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { blogsController, getBlogsController, updateBlogsController, deleteBlogsController };
