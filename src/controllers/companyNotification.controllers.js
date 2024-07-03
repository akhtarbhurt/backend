// controllers/notification.controllers.js

import CompanyNotification from "../models/companyNotification.models.js";


const getNotificationsForCompany = async (req, res) => {
  try {
    const { companyID } = req.params;
    const notifications = await CompanyNotification.find({ companyID }).sort({ createdAt: -1 });

    if (!notifications) {
      return res.status(400).json({ error: "No notifications found" });
    }

    return res.status(200).json({ notifications });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const markNotificationAsSeen = async (req, res) => {
  try {
    const { id } = req.params;
    await CompanyNotification.findByIdAndUpdate(id, { seen: true });
    return res.status(200).json({ message: "Notification marked as seen" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { getNotificationsForCompany, markNotificationAsSeen };
