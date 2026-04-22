let employees = [
  { id: 1, name: "John Smith", email: "john@company.com", department: "Engineering", role: "admin" },
  { id: 2, name: "Jane Doe", email: "jane@company.com", department: "Marketing", role: "employee" },
  { id: 3, name: "Bob Johnson", email: "bob@company.com", department: "Sales", role: "employee" },
];

let performanceReviews = [
  {
    id: 1,
    employeeId: 2,
    title: "Q1 2026 Performance Review",
    description: "Quarterly evaluation for Jane Doe",
    dueDate: "2026-04-30",
    status: "active", // active, completed, pending
    createdAt: "2026-04-01",
  },
  {
    id: 2,
    employeeId: 3,
    title: "Q1 2026 Performance Review",
    description: "Quarterly evaluation for Bob Johnson",
    dueDate: "2026-04-30",
    status: "active",
    createdAt: "2026-04-01",
  },
];

let reviewAssignments = [
  { id: 1, reviewId: 1, reviewerId: 3, status: "pending" },
  { id: 2, reviewId: 1, reviewerId: 1, status: "pending" },
  { id: 3, reviewId: 2, reviewerId: 2, status: "pending" },
];

let feedback = [];

export const getAllEmployees = () => {
  return JSON.parse(JSON.stringify(employees));
};

export const getEmployeeById = (id) => {
  return employees.find((emp) => emp.id === id);
};

export const createEmployee = (employeeData) => {
  const newEmployee = {
    id: Math.max(...employees.map((e) => e.id), 0) + 1,
    ...employeeData,
  };
  employees.push(newEmployee);
  return newEmployee;
};

export const updateEmployee = (id, employeeData) => {
  const index = employees.findIndex((emp) => emp.id === id);
  if (index !== -1) {
    employees[index] = { ...employees[index], ...employeeData };
    return employees[index];
  }
  return null;
};

export const deleteEmployee = (id) => {
  const index = employees.findIndex((emp) => emp.id === id);
  if (index !== -1) {
    employees.splice(index, 1);
    return true;
  }
  return false;
};

export const getAllPerformanceReviews = () => {
  return JSON.parse(JSON.stringify(performanceReviews));
};

export const getReviewById = (id) => {
  return performanceReviews.find((review) => review.id === id);
};

export const createPerformanceReview = (reviewData) => {
  const newReview = {
    id: Math.max(...performanceReviews.map((r) => r.id), 0) + 1,
    ...reviewData,
    createdAt: new Date().toISOString().split("T")[0],
  };
  performanceReviews.push(newReview);
  return newReview;
};

export const updatePerformanceReview = (id, reviewData) => {
  const index = performanceReviews.findIndex((review) => review.id === id);
  if (index !== -1) {
    performanceReviews[index] = {
      ...performanceReviews[index],
      ...reviewData,
    };
    return performanceReviews[index];
  }
  return null;
};

export const deletePerformanceReview = (id) => {
  const index = performanceReviews.findIndex((review) => review.id === id);
  if (index !== -1) {
    performanceReviews.splice(index, 1);
    return true;
  }
  return false;
};

export const getAllReviewAssignments = () => {
  return JSON.parse(JSON.stringify(reviewAssignments));
};

export const getAssignmentsByReviewId = (reviewId) => {
  return reviewAssignments.filter((a) => a.reviewId === reviewId);
};

export const getAssignmentsByReviewerId = (reviewerId) => {
  return reviewAssignments.filter((a) => a.reviewerId === reviewerId);
};

export const createReviewAssignment = (assignmentData) => {
  const newAssignment = {
    id: Math.max(...reviewAssignments.map((a) => a.id), 0) + 1,
    status: "pending",
    ...assignmentData,
  };
  reviewAssignments.push(newAssignment);
  return newAssignment;
};

export const updateReviewAssignment = (id, assignmentData) => {
  const index = reviewAssignments.findIndex((a) => a.id === id);
  if (index !== -1) {
    reviewAssignments[index] = {
      ...reviewAssignments[index],
      ...assignmentData,
    };
    return reviewAssignments[index];
  }
  return null;
};

export const deleteReviewAssignment = (id) => {
  const index = reviewAssignments.findIndex((a) => a.id === id);
  if (index !== -1) {
    reviewAssignments.splice(index, 1);
    return true;
  }
  return false;
};

export const getAllFeedback = () => {
  return JSON.parse(JSON.stringify(feedback));
};

export const getFeedbackByAssignmentId = (assignmentId) => {
  return feedback.find((f) => f.assignmentId === assignmentId);
};

export const submitFeedback = (feedbackData) => {
  const newFeedback = {
    id: Math.max(...feedback.map((f) => f.id), 0) + 1,
    submittedAt: new Date().toISOString().split("T")[0],
    ...feedbackData,
  };
  feedback.push(newFeedback);
  return newFeedback;
};

export const updateAssignmentFeedback = (assignmentId) => {
  const assignment = reviewAssignments.find((a) => a.id === assignmentId);
  if (assignment) {
    assignment.status = "completed";
    return assignment;
  }
  return null;
};
