import { Router } from "express";
import { getReportController, reportController } from "../controllers/reports.controllers.js";

const router = Router()

router.post("/reports", reportController)
router.get("/reports", getReportController)

export default router