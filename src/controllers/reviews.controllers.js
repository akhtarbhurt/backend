import CompanyNotification from "../models/companyNotification.models.js";
import { Reviews } from "../models/review.models.js";
import { broadcast } from "../index.js"; // Import the broadcast function
import { Reply } from "../models/reply.models.js";
import Notification from "../models/notification.models.js";
import { UserRegistration } from "../models/userRegistration.models.js";
import { UserNotification } from "../models/userNotification.models.js";
import jwt from "jsonwebtoken"

const reviewsController = async (req, res) => {
  try {
    const { name, review, rating, companyID, userID } = req.body;
    const payload = await Reviews.create({ name, review, rating, companyID, userID });

    if (!payload) {
      return res.status(400).json({ error: "Review and rating not found" });
    }

    // Create a notification for the company
    const notification = await CompanyNotification.create({
      companyID,
      message: `New review from ${name}: "${review}" with rating ${rating}`,
    });

    if (!notification) {
      return res.status(400).json({ error: "Notification not created" });
    }

    // Broadcast the new notification to WebSocket clients
    broadcast({
      type: 'new_notification',
      data: notification
    });

    return res.status(200).json({ message: "Successfully created review!", result: payload });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getReviewController = async (req, res) => {
  try {
    const payload = await Reviews.find();
    if (!payload) {
      return res.status(400).json({ error: "response is not available" });
    }
    return res.status(200).json({ payload });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

const updateReviewController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, review, rating, companyID, userID } = req.body;

    const payload = await Reviews.findByIdAndUpdate(id, { name, review, rating, companyID, userID }, { new: true });
    if (!payload) {
      return res.status(400).json({ error: "response is not available"});
    }
    return res.status(200).json({ payload });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

const deleteReviewController = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = await Reviews.findByIdAndDelete(id);
    if (!payload) {
      return res.status(400).json({ error: "response is not available" });
    }
    return res.status(200).json({ payload });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

const companyReviewController = async (req, res) => {
  try {
    const { companyID } = req.params;
    const payload = await Reviews.find({ companyID });
    if (!payload || payload.length === 0) {
      return res.status(400).json({ error: "No reviews found for this company" });
    }
    return res.status(200).json({ payload });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

const userReviewController = async (req, res) => {
  try {
    const { userID } = req.params;
    const payload = await Reviews.find({ userID });
    if (!payload || payload.length === 0) {
      return res.status(400).json({ error: "No reviews found for this company" });
    }
    return res.status(200).json({ payload });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

const addReplyController = async (req, res) => {
  try {
    const {  reviewID, text, isCompanyReply } = req.body;

    // Fetch the review to get the userID
    const review = await Reviews.findById(reviewID);
    if (!review) {
      return res.status(400).json({ error: "Review not found" });
    }

    const reply = await Reply.create({
      reviewID,
      userID: review.userID,
      text,
      isCompanyReply
    });

    if (!reply) {
      return res.status(400).json({ error: "Reply not created" });
    }

    //find a company name
    const {Companytoken} = req?.cookies
    const verifyToken = jwt.verify(Companytoken, process.env.JWT_SECRET)
    console.log( "verifytoken of company is ", verifyToken)
    // Create a notification for the user
    const notification = await UserNotification.create({
      userID: review.userID,
      text: `${verifyToken.companyName} replied to your review: "${text}"`,
      companyName: verifyToken.companyName
    });

    // Broadcast the new reply and notification to WebSocket clients
    broadcast({
      type: 'new_reply',
      data: {
        reply,
        notification,
      }
    });

    return res.status(200).json({ message: "Reply added successfully", result: reply });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


const getRepliesController = async (req, res) => {
  try {
    const payload = await Reply.find();
    if (!payload) {
      return res.status(400).json({ error: "No replies found" });
    }
    return res.status(200).json({ payload });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export {
  reviewsController,
  getReviewController,
  updateReviewController,
  deleteReviewController,
  companyReviewController,
  userReviewController,
  addReplyController,
  getRepliesController
};
