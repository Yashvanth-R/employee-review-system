import * as db from "../data/db.js";

// Get all performance reviews
export const getPerformanceReviews = (req, res) => {
  try {
    const reviews = db.getAllPerformanceReviews();
    res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};

// Get review by ID with assignments
export const getReviewById = (req, res) => {
  try {
    const { id } = req.params;
    const review = db.getReviewById(parseInt(id));

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    const assignments = db.getAssignmentsByReviewId(review.id);
    res.json({
      success: true,
      data: {
        ...review,
        assignments,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching review",
      error: error.message,
    });
  }
};

// Create performance review
export const createPerformanceReview = (req, res) => {
  try {
    const { employeeId, title, description, dueDate, status } = req.body;

    if (!employeeId || !title || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "employeeId, title, and dueDate are required",
      });
    }

    const employee = db.getEmployeeById(parseInt(employeeId));
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const review = db.createPerformanceReview({
      employeeId: parseInt(employeeId),
      title,
      description,
      dueDate,
      status: status || "active",
    });

    res.status(201).json({
      success: true,
      data: review,
      message: "Performance review created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating review",
      error: error.message,
    });
  }
};

// Update performance review
export const updatePerformanceReview = (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const review = db.updatePerformanceReview(parseInt(id), updateData);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.json({
      success: true,
      data: review,
      message: "Performance review updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating review",
      error: error.message,
    });
  }
};

// Delete performance review
export const deletePerformanceReview = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = db.deletePerformanceReview(parseInt(id));

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.json({
      success: true,
      message: "Performance review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting review",
      error: error.message,
    });
  }
};
