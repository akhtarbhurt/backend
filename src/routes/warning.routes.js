import { Router } from "express";
import { getLatestWarningController, getWarningController, warningController } from "../controllers/warning.controllers.js";

const router = Router()

router.route("/warning").post(warningController)
router.route("/warning/:userID").get(getWarningController)
router.route("/latest-warning/:userID").get(getLatestWarningController);

export default router