import express from 'express';
import {
  deleteUserRegController,
  getNotificationsController,
  getUserRegController,
  markAllNotificationsAsSeenController,
  markNotificationAsSeenController,
  updateUserRegController,
  userRegistrationController,
  loginController,
  verifyEmailController,
  getLoginController,
  partialUpdateUserRegController,
  getReportedReviewsController,
  reportReviewController,
  deleteReportReviewController,
  logoutCompany,
  changePasswordController, // Import the new controller
  requestPasswordResetController,
  resetPasswordController
} from '../controllers/userRegistration.controller.js';
import { upload } from '../middleware/multer.middleware.js';
import authMiddleware from '../middleware/companyAuth.middleware.js';

const router = express.Router();

router.post('/userReg', upload.single('logo'), userRegistrationController);
router.get('/userReg', getUserRegController);
router.delete('/userReg/:id', deleteUserRegController);
router.put('/userReg/:id', upload.single('logo'), updateUserRegController);
router.get('/notifications', getNotificationsController);
router.put('/notifications/:id/seen', markNotificationAsSeenController);
router.put('/notifications/markAllSeen', markAllNotificationsAsSeenController);
router.post('/companyLogin', loginController);
router.get('/companyLogin', getLoginController);
router.get('/verify/:token', verifyEmailController);
router.put('/userReg/:id/partial', upload.single('logo'), partialUpdateUserRegController);
router.post('/reportReview', reportReviewController);
router.get('/reportedReviews', getReportedReviewsController);
router.delete('/reportedReviews/:id', deleteReportReviewController);
router.post('/companyLogout', authMiddleware, logoutCompany);
router.post('/changePassword', authMiddleware, changePasswordController); 
router.post('/request-password-reset', requestPasswordResetController);
router.post('/reset-password/:token', resetPasswordController);
export default router;
