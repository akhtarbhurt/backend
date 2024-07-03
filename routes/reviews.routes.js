import { Router } from "express";
import {
  addReplyController,
  companyReviewController,
  deleteReviewController,
  getRepliesController,
  getReviewController,
  reviewsController,
  updateReviewController,
  userReviewController
} from "../controllers/reviews.controllers.js";
import { extractUserInfo } from "../middleware/extractUserInfo.middleware.js";
import { checkAuthentication } from "../middleware/checkAuthentication.js";

const router = Router();

router.route("/reviews")
  .post( reviewsController)
  .get(getReviewController);

router.route("/reviews/:id")
  .put( updateReviewController)
  .delete( deleteReviewController);

router.route("/companyReviews/:companyID").get(companyReviewController);
router.route("/userReviews/:userID").get(userReviewController);
router.route("/reply").post( checkAuthentication, addReplyController); 
router.route("/replies").get(getRepliesController);


export default router;
