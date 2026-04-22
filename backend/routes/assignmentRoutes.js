import express from "express";
import * as assignmentController from "../controllers/assignmentController.js";

const router = express.Router();

router.get("/", assignmentController.getAssignments);
router.get("/review/:reviewId", assignmentController.getAssignmentsByReviewId);
router.get("/pending/:reviewerId", assignmentController.getMyPendingAssignments);
router.post("/", assignmentController.createAssignment);
router.delete("/:id", assignmentController.deleteAssignment);

export default router;
