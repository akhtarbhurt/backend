import express from 'express';
import { sendEmailController, verifyAdminEmailController } from '../controllers/mailer.controller.js';

const router = express.Router();

router.post('/sendEmail', sendEmailController);
router.get('/verify/:token', verifyAdminEmailController);

export default router;
