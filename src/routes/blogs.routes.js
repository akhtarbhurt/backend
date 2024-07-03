import express from 'express';
import { upload } from '../middleware/multer.middleware.js';
import { blogsController, deleteBlogsController, getBlogsController, updateBlogsController } from '../controllers/blogs.controllers.js';
import role from '../middleware/role.middleware.js';

const router = express.Router();

router.post('/blog', upload.single('blogImage'), role, blogsController);
router.get('/blog', role, getBlogsController);
router.delete('/blog/:id', role, deleteBlogsController);
router.put("/blog/:id", upload.single('blogImage'),  updateBlogsController );

export default router;
