// routes/notification.routes.js

import { Router } from 'express';
import { getNotificationsForCompany, markNotificationAsSeen } from '../controllers/companyNotification.controllers.js';
import role from '../middleware/role.middleware.js';

const router = Router();

router.get('/notifications/:companyID',  getNotificationsForCompany);
router.put('/notifications/mark-as-seen/:id',  markNotificationAsSeen);

export default router;
