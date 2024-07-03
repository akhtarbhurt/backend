import { broadcast } from "../index.js";
import { Reviews } from "../models/review.models.js";
import { Warning } from "../models/warning.models.js";
const warningController = async (req, res) => {
    try {
        const { userID, reviewId, warningText, warningNumber } = req.body;

        // Create a warning with the review's userID
        const payload = await Warning.create({ userID, warningText, warningNumber, reviewId });
        if (!payload) {
            return res.status(404).json({ error: "Failed to create warning" });
        }
     

        broadcast({ type: 'new-warning', data: { userID, warningText } });
        return res.status(200).json({ result: payload });
    } catch (error) {
        console.error("Error in warningController:", error);
        return res.status(500).json({ error: error.message });
    }
};


const getWarningController = async (req, res) => {
    try {
        const { userID } = req.params;

        

        // Find the warning by userID
        const payload = await Warning.find({ userID });
        if (!payload) {
            return res.status(404).json({ error: "No data found in warning" });
        }
       
        return res.status(200).json({ result: payload });
    } catch (error) {
        console.error("Error in getWarningController:", error);
        return res.status(500).json({ error: error.message });
    }
};

const getLatestWarningController = async (req, res) => {
    try {
      const { userID } = req.params;
  
      // Find the latest warning by userID
      const payload = await Warning.findOne({ userID }).sort({ createdAt: -1 });
      if (!payload) {
        return res.status(404).json({ error: "No warnings found" });
      }
  
      return res.status(200).json({ result: payload });
    } catch (error) {
      console.error("Error in getLatestWarningController:", error);
      return res.status(500).json({ error: error.message });
    }
  };
  
  

export { warningController, getWarningController, getLatestWarningController };
