import User from "../models/user.models.js";

const blockController = async (req, res) => {
  try {
    const { userID } = req.params;
    const payload = await User.findByIdAndUpdate(userID, { status: "blocked" }, { new: true });
    if (!payload) return res.status(404).json({ message: "No data found" });
    return res.status(200).json({ result: payload });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const unblockController = async (req, res) => {
  try {
    const { userID } = req.params;
    const payload = await User.findByIdAndUpdate(userID, { status: "unblocked" }, { new: true });
    if (!payload) return res.status(404).json({ message: "No data found" });
    return res.status(200).json({ result: payload });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { blockController, unblockController };
