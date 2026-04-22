import * as db from "../data/db.js";

// Get all feedback
export const getFeedback = (req, res) => {
  try {
    const feedback = db.getAllFeedback();
    res.json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching feedback",
      error: error.message,
    });
  }
};

// Get feedback for an assignment
export const getFeedbackByAssignmentId = (req, res) => {
  try {
    const { assignmentId } = req.params;
    const feedback = db.getFeedbackByAssignmentId(parseInt(assignmentId));

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    res.json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching feedback",
      error: error.message,
    });
  }
};

// Submit feedback for an assignment
export const submitFeedback = (req, res) => {
  try {
    const { assignmentId, content, rating } = req.body;

    if (!assignmentId || !content || rating === undefined) {
      return res.status(400).json({
        success: false,
        message: "assignmentId, content, and rating are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Verify assignment exists
    const assignments = db.getAllReviewAssignments();
    const assignment = assignments.find((a) => a.id === parseInt(assignmentId));
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    const feedback = db.submitFeedback({
      assignmentId: parseInt(assignmentId),
      content,
      rating: parseInt(rating),
    });

    // Update assignment status to completed
    db.updateAssignmentFeedback(parseInt(assignmentId));

    res.status(201).json({
      success: true,
      data: feedback,
      message: "Feedback submitted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error submitting feedback",
      error: error.message,
    });
  }
};
