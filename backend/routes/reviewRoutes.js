import express from "express";
import * as reviewController from "../controllers/reviewController.js";

const router = express.Router();

router.get("/", reviewController.getPerformanceReviews);
router.get("/:id", reviewController.getReviewById);
router.post("/", reviewController.createPerformanceReview);
router.put("/:id", reviewController.updatePerformanceReview);
router.delete("/:id", reviewController.deletePerformanceReview);

export default router;
