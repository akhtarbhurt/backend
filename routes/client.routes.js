import express from 'express';
import { upload } from '../middleware/multer.middleware.js';
import { clientController, deleteClientController, getClientController, updateClientController } from '../controllers/client.controllers.js';
import role from '../middleware/role.middleware.js';

const router = express.Router();

router.post('/client', upload.single('reviewImage'), role,  clientController);
router.get('/client',  getClientController);
router.delete('/client/:id', role, deleteClientController);
router.put("/client/:id", upload.single('reviewImage'), role, updateClientController);

export default router;
