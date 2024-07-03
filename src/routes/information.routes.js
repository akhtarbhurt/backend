import express from 'express';
import { upload } from '../middleware/multer.middleware.js';
import { deleteInformationController, getInformationController, informationController, updateInformationController } from '../controllers/addCompany.controllers.js';

const router = express.Router();

router.post('/information', upload.single('infoImage'), informationController);
router.get('/information', getInformationController);
router.delete('/information/:id', deleteInformationController);
router.put("/information/:id", upload.single('infoImage'), updateInformationController);

export default router;
