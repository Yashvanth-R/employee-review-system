import express from "express";
import * as feedbackController from "../controllers/feedbackController.js";

const router = express.Router();

router.get("/", feedbackController.getFeedback);
router.get("/:assignmentId", feedbackController.getFeedbackByAssignmentId);
router.post("/", feedbackController.submitFeedback);

export default router;
