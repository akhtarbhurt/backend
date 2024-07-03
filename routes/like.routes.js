import express from "express";
import { likeController, likeGetController, likePostController, likeUserController } from "../controllers/likes.controllers.js";
import { checkAuthentication } from "../middleware/checkAuthentication.js";

const router = express.Router();

router.route("/like").post( checkAuthentication, likeController);
router.route("/like/user/:userID").get( checkAuthentication, likeUserController); // Adjusted route for user likes
router.route("/like/post/:postID").get( checkAuthentication, likePostController); // Adjusted route for post likes
router.route("/like").get( checkAuthentication, likeGetController);

export default router;
