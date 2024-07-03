import express from 'express';
import { upload } from '../middleware/multer.middleware.js';
import { deleteSectionController, getSectionController, sectionController, updateSectionController } from '../controllers/section.controllers.js';

const router = express.Router();

router.post('/section', upload.single('sectionImage'), sectionController);
router.get('/section', getSectionController);
router.delete('/section/:id', deleteSectionController);
router.put("/section/:id", upload.single('sectionImage'), updateSectionController);

export default router;
