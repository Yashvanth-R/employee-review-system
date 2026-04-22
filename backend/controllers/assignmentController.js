import * as db from "../data/db.js";

export const getAssignments = (req, res) => {
  try {
    const assignments = db.getAllReviewAssignments();
    res.json({
      success: true,
      data: assignments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching assignments",
      error: error.message,
    });
  }
};

export const getAssignmentsByReviewId = (req, res) => {
  try {
    const { reviewId } = req.params;
    const assignments = db.getAssignmentsByReviewId(parseInt(reviewId));

    res.json({
      success: true,
      data: assignments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching assignments",
      error: error.message,
    });
  }
};

export const getMyPendingAssignments = (req, res) => {
  try {
    const { reviewerId } = req.params;
    const assignments = db.getAssignmentsByReviewerId(parseInt(reviewerId));
    const enrichedAssignments = assignments.map((assignment) => {
      const review = db.getReviewById(assignment.reviewId);
      const employee = db.getEmployeeById(review.employeeId);
      const reviewer = db.getEmployeeById(assignment.reviewerId);
      
      return {
        ...assignment,
        review,
        employee,
        reviewer,
      };
    });

    res.json({
      success: true,
      data: enrichedAssignments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching assignments",
      error: error.message,
    });
  }
};

export const createAssignment = (req, res) => {
  try {
    const { reviewId, reviewerId } = req.body;

    if (!reviewId || !reviewerId) {
      return res.status(400).json({
        success: false,
        message: "reviewId and reviewerId are required",
      });
    }

    const review = db.getReviewById(parseInt(reviewId));
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    const reviewer = db.getEmployeeById(parseInt(reviewerId));
    if (!reviewer) {
      return res.status(404).json({
        success: false,
        message: "Reviewer not found",
      });
    }

    const assignment = db.createReviewAssignment({
      reviewId: parseInt(reviewId),
      reviewerId: parseInt(reviewerId),
    });

    res.status(201).json({
      success: true,
      data: assignment,
      message: "Review assignment created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating assignment",
      error: error.message,
    });
  }
};

export const deleteAssignment = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = db.deleteReviewAssignment(parseInt(id));

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    res.json({
      success: true,
      message: "Assignment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting assignment",
      error: error.message,
    });
  }
};
