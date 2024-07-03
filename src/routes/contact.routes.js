import express, { Router } from "express"
import { contactController, getContactController } from "../controllers/contact.controllers.js"
import role from "../middleware/role.middleware.js"
const router = Router()

router.post("/contact", role, contactController)
router.get("/contact", getContactController  )

export default router