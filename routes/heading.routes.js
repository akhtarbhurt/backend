import express from 'express';
import { upload } from '../middleware/multer.middleware.js';
import { deleteHeadingController, getHeadingController, headingController, updateHeadingController } from '../controllers/heading.controller.js';

const router = express.Router();

router.post('/heading', upload.single('bgImage'), headingController);
router.get('/heading', getHeadingController);
router.delete('/heading/:id', deleteHeadingController);
router.put("/heading/:id", upload.single('bgImage'), updateHeadingController);

export default router;
