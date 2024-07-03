import { UserRegistration } from "../models/userRegistration.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { broadcast } from "../index.js";
import Notification from "../models/notification.models.js"; // Import Notification model
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'; // To generate a unique token
import nodemailer from 'nodemailer'; // To send emails
import { Reviews } from "../models/review.models.js";
import ReportNotification from "../models/reportNotification.models.js";

const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_SECRET = process.env.EMAIL_SECRET; // Secret for email tokens
const EMAIL_FROM = process.env.EMAIL_FROM; // Sender email address

// Set up the email transporter
const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: "a71899af5ab622",
    pass: "6fc90e1362b7ad"
  }
});

const sendVerificationEmail = (email, token) => {
  const verificationLink = `http://localhost:3000/api/v1/verify/${token}`;
  const mailOptions = {
    from: EMAIL_FROM,
    to: email,
    subject: 'Company Email Verification',
    text: `Please verify your email by clicking the following link: ${verificationLink}`,
    html: `<p>Please verify your email by clicking the following link:</p><a href="${verificationLink}">${verificationLink}</a>`
  };

  return transporter.sendMail(mailOptions);
};

const userRegistrationController = async (req, res) => {
  try {
    const {
      companyName,
      personName,
      email,
      phone,
      address,
      industry,
      location,
      description,
      founded,
      startTime,
      endTime,
      instagram,
      facebook,
      linkedin,
      status,
      siteLink,
      category,
      password,
      confirmPassword,
      progressbar
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const avatarLocalPath = req.file?.path;
    if (!avatarLocalPath) {
      return res.status(400).json({ error: "Image not found" });
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar.url) {
      return res.status(400).json({ error: "Cloudinary image link not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const payload = await UserRegistration.create({
      logo: avatar.url,
      companyName,
      personName,
      email,
      phone,
      address,
      industry,
      location,
      description,
      founded,
      startTime,
      endTime,
      instagram,
      facebook,
      linkedin,
      status: 'pending',
      siteLink,
      category,
      password: hashedPassword,
      progressbar
    });

    await Notification.create({
      companyName,
      message: `${companyName} has joined you`,
    });

    broadcast({ type: 'new_registration', data: { companyName } });

    return res.status(200).json({ message: "Registration successful, waiting for admin approval" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// this is controller of verified email 
const verifyEmailController = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await UserRegistration.findOne({ verificationToken: token, tokenExpiration: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ message: "Token is invalid or has expired" });
    }

    user.status = 'active';
    user.verificationToken = undefined;
    user.tokenExpiration = undefined;
    await user.save();

    // Redirect to login page with a success parameter
    return res.redirect('http://localhost:5173/companyLogin?verified=true');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserRegistration.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    if (user.status !== 'active') {
      return res.status(400).json({ error: "Please verify your email before logging in" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const companyToken = jwt.sign({ userId: user._id, companyName: user.companyName, logo: user.logo }, JWT_SECRET, { expiresIn: '1d' });
    res.cookie("Companytoken", companyToken, { httpOnly: true });

    return res.status(200).json({
      message: "Login successful",
      companyToken,
      user: {
        companyName: user.companyName,
        personName: user.personName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        industry: user.industry,
        location: user.location,
        description: user.description,
        founded: user.founded,
        startTime: user.startTime,
        endTime: user.endTime,
        instagram: user.instagram,
        facebook: user.facebook,
        linkedin: user.linkedin,
        siteLink: user.siteLink,
        category: user.category,
        progressbar: user.progressbar
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
};


const getLoginController = async (req, res)=>{
  try {
    const {Companytoken} = req?.cookies
   
    const verifyToken = jwt.verify(Companytoken, JWT_SECRET)
    const payload = await UserRegistration.findById(verifyToken.userId)
   
    if(!payload) res.status(400).json({result: "there is not data get from token"})
    return res.status(200).json({result: payload})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });

  }
}



// Add a controller to fetch notifications
const getNotificationsController = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    return res.status(200).json({ result: notifications });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

// Add a controller to mark notifications as seen
const markNotificationAsSeenController = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndUpdate(id, { seen: true });
    return res.status(200).json({ message: "Notification marked as seen" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const markAllNotificationsAsSeenController = async (req, res) => {
  try {
    await Notification.updateMany({ seen: false }, { seen: true });
    return res.status(200).json({ message: "All notifications marked as seen" });
  } catch (error) {
    console.error("Failed to mark all notifications as seen", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUserRegController = async (req, res) => {
  try {
    const payload = await UserRegistration.find();
    if (!payload) return res.status(400).json({ error: "nothing found in request" });
    return res.status(200).json({ result: payload });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const updateUserRegController = async (req, res) => {
  try {
    const { id } = req.params;

    // Handle file upload
    let logoUrl = req?.body?.logo;
    if (req.file) {
      const avatar = await uploadOnCloudinary(req?.file?.path);
      logoUrl = avatar.url;
    }

    const updatedData = { ...req.body, logo: logoUrl };
    const previousUser = await UserRegistration.findById(id);

    const payload = await UserRegistration.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!payload) return res.status(400).json({ error: "No data found" });

    // Send verification email if status changed to active
    if (updatedData.status === 'active' && previousUser.status !== 'active') {
      const verificationToken = crypto.randomBytes(20).toString('hex');
      const tokenExpiration = Date.now() + 3600000; // 1 hour from now

      payload.verificationToken = verificationToken;
      payload.tokenExpiration = tokenExpiration;
      await payload.save();

      await sendVerificationEmail(payload.email, verificationToken);
    }

    return res.status(200).json({ result: payload });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUserRegController = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = await UserRegistration.findByIdAndDelete(id);
    if (!payload) return res.status(400).json({ error: "no data found" });
    return res.status(200).json({ result: payload });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const partialUpdateUserRegController = async (req, res) => {
  try {
    const { id } = req.params;

    // Handle file upload if there is a new file
    let logoUrl = req.body.logo;
    if (req.file) {
      const avatar = await uploadOnCloudinary(req.file.path);
      logoUrl = avatar.url;
    }

    const updatedData = { ...req.body, logo: logoUrl };
    
    const payload = await UserRegistration.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, upsert: true } // Upsert: create if not exists
    );

    if (!payload) return res.status(400).json({ error: "No data found" });

    return res.status(200).json({ result: payload });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const reportReviewController = async (req, res) => {
  try {
    const { reviewID, action, companyName, userName } = req.body;
    const reviewData = await Reviews.findById(reviewID);
    const { Companytoken } = req?.cookies;
    const {token} = req?.cookies
    if (!reviewData) {
      return res.status(404).json({ message: 'Review not found' });
    }
    const verifyToken = jwt.verify(Companytoken, JWT_SECRET);
    const reportedNotification = await ReportNotification.create({
      message: `Review reported for ${action}: ${reviewData.review}`,
      userID: reviewData.userID,
      action,
      companyName: verifyToken.companyName,
      userName: reviewData.name,
      review: reviewData.review,
      reviewId: reviewData._id
    });

    const notification = await Notification.create({
      message: `Review reported for ${action}: ${reviewData.review}`,
      userID: reviewData.userID,
      action,
      companyName,
      userName,
    });

    broadcast({ type: 'review_report', data: { notification } });

    return res.status(200).json({ message: 'Report submitted successfully', result: reportedNotification });
  } catch (error) {
    console.error('Failed to report review', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteReportReviewController = async (req, res)=>{
  try {
    const {id} = req?.params
    const payload = await ReportNotification.findByIdAndDelete(id)
    if(!payload) return res.status(404).json({error: "no data found in report notification"})
    return res.status(200).json({payload, message: "deleted successful"})
  } catch (error) {
    console.log(error)
  }
}


const getReportedReviewsController = async (req, res) => {
  try {
    const reports = await ReportNotification.find();
    return res.status(200).json({ result: reports });
  } catch (error) {
    console.error('Failed to fetch reported reviews', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const logoutCompany = async (req, res) => {
  try {
    // Clear the token from the client by setting the cookie to an empty value with an immediate expiration
    res.clearCookie("Companytoken", { httpOnly: true, secure: false });

    // Respond with a success message
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Failed to logout", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const changePasswordController = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "New passwords do not match" });
    }

    const userId = req.user.userId; 
    const user = await UserRegistration.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Failed to change password", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



const sendPasswordResetEmail = (email, token) => {
  const resetLink = `http://localhost:5173/reset-password/${token}`;
  const mailOptions = {
    from: EMAIL_FROM,
    to: email,
    subject: 'Password Reset Request',
    text: `Please reset your password by clicking the following link: ${resetLink}`,
    html: `<p>Please reset your password by clicking the following link:</p><a href="${resetLink}">${resetLink}</a>`
  };

  return transporter.sendMail(mailOptions);
};

const requestPasswordResetController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserRegistration.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const tokenExpiration = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = tokenExpiration;
    await user.save();

    await sendPasswordResetEmail(user.email, resetToken);

    return res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const user = await UserRegistration.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Token is invalid or has expired' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export { 
  userRegistrationController, 
  getUserRegController, 
  updateUserRegController, 
  deleteUserRegController, 
  getNotificationsController, 
  markNotificationAsSeenController, 
  markAllNotificationsAsSeenController, 
  loginController, 
  verifyEmailController,
  getLoginController,
  partialUpdateUserRegController,
  reportReviewController,
  getReportedReviewsController,
  deleteReportReviewController,
  logoutCompany,
  changePasswordController,
  requestPasswordResetController,
  resetPasswordController
};
