import express, { Router } from "express";
import { categoryController, deleteCategoryController, getCategoryController, updateCategoryController } from "../controllers/category.controllers.js";
import { upload } from "../middleware/multer.middleware.js";
import role from "../middleware/role.middleware.js";

const router = Router();

router.post("/category", upload.single('catImage'), role,  categoryController);
router.put("/category/:id",upload.single('catImage'), role, updateCategoryController); // Note: Added ':' before 'id' to correctly capture URL parameter
router.delete("/category/:id", role, deleteCategoryController); // Note: Added ':' before 'id' to correctly capture URL parameter
router.get("/category", getCategoryController ); // Note: Added ':' before 'id' to correctly capture URL parameter


export default router;
