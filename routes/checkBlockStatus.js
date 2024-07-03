import { Router } from "express";
import { blockController, unblockController } from "../controllers/checkBlockStatus.controllers.js";

const router = Router();

router.patch("/block/:userID", blockController);
router.patch("/unblock/:userID", unblockController);  // Changed path to /unblock

export default router;
