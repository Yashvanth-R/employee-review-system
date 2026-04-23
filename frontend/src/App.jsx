import React, { useState, useEffect } from "react";
import { Login } from "./pages/Login";
import { AdminDashboard } from "./pages/AdminDashboard";
import { EmployeeFeedback } from "./pages/EmployeeFeedback";
import {
  employeeAPI,
  reviewAPI,
  assignmentAPI,
  feedbackAPI,
} from "./api";

function App() {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Data states
  const [employees, setEmployees] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [feedback, setFeedback] = useState([]);

  // UI states
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Checking if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setCurrentUser(JSON.parse(user));
      setIsAuthenticated(true);
      loadData();
    } else {
      setLoading(false);
    }
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [empRes, revRes, assRes, fbRes] = await Promise.all([
        employeeAPI.getAll(),
        reviewAPI.getAll(),
        assignmentAPI.getAll(),
        feedbackAPI.getAll(),
      ]);

      setEmployees(empRes.data.data || []);
      setReviews(revRes.data.data || []);
      setAssignments(
        (assRes.data.data || []).map((a) => ({
          ...a,
          review: (revRes.data.data || []).find((r) => r.id === a.reviewId),
        }))
      );
      setFeedback(fbRes.data.data || []);
    } catch (error) {
      console.error("Error loading data:", error);
      setMessage("Error loading data from server");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (user, token) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    loadData();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setCurrentUser(null);
    setEmployees([]);
    setReviews([]);
    setAssignments([]);
    setFeedback([]);
    setMessage("Logged out successfully");
    setTimeout(() => setMessage(""), 3000);
  };

  // Employee operations
  const handleAddEmployee = async (data) => {
    try {
      const response = await employeeAPI.create(data);
      setEmployees([...employees, response.data.data]);
      setMessage("Employee added successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error adding employee: " + error.message);
    }
  };

  const handleUpdateEmployee = async (id, data) => {
    try {
      const response = await employeeAPI.update(id, data);
      setEmployees(
        employees.map((e) => (e.id === id ? response.data.data : e))
      );
      setMessage("Employee updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error updating employee: " + error.message);
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await employeeAPI.delete(id);
        setEmployees(employees.filter((e) => e.id !== id));
        setMessage("Employee deleted successfully!");
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        setMessage("Error deleting employee: " + error.message);
      }
    }
  };

  // Review operations
  const handleAddReview = async (data) => {
    try {
      const response = await reviewAPI.create(data);
      setReviews([...reviews, response.data.data]);
      setMessage("Review created successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error creating review: " + error.message);
    }
  };

  const handleUpdateReview = async (id, data) => {
    try {
      const response = await reviewAPI.update(id, data);
      setReviews(
        reviews.map((r) => (r.id === id ? response.data.data : r))
      );
      setMessage("Review updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error updating review: " + error.message);
    }
  };

  const handleDeleteReview = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await reviewAPI.delete(id);
        setReviews(reviews.filter((r) => r.id !== id));
        setMessage("Review deleted successfully!");
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        setMessage("Error deleting review: " + error.message);
      }
    }
  };

  // Assignment operations
  const handleAddAssignment = async (data) => {
    try {
      const response = await assignmentAPI.create(data);
      const review = reviews.find((r) => r.id === parseInt(data.reviewId));
      setAssignments([
        ...assignments,
        { ...response.data.data, review },
      ]);
      setMessage("Assignment created successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error creating assignment: " + error.message);
    }
  };

  const handleDeleteAssignment = async (id) => {
    try {
      await assignmentAPI.delete(id);
      setAssignments(assignments.filter((a) => a.id !== id));
      setMessage("Assignment deleted successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error deleting assignment: " + error.message);
    }
  };

  // Feedback operations
  const handleSubmitFeedback = async (assignmentId, data) => {
    try {
      const response = await feedbackAPI.submit({
        assignmentId,
        ...data,
      });
      setFeedback([...feedback, response.data.data]);
      setAssignments(
        assignments.map((a) =>
          a.id === assignmentId ? { ...a, status: "completed" } : a
        )
      );
      setMessage("Feedback submitted successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error submitting feedback: " + error.message);
    }
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center animate-slideInUp">
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">
            PR
          </div>
          <p className="text-gray-700 font-medium">Loading your dashboard...</p>
          <p className="text-sm text-gray-500 mt-1">Please wait</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 animate-slideInDown">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              PR
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Performance Review
              </h1>
              <p className="text-xs text-gray-600">Management System</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {currentUser?.name?.charAt(0)?.toUpperCase()}
              </div>
              <div className="text-right hidden sm:block">
                <p className="font-medium text-gray-900 text-sm">{currentUser?.name}</p>
                <p className="text-xs text-gray-600 capitalize">
                  {currentUser?.role}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-300 font-medium text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {message && (
        <div className="fixed top-20 right-4 z-40 animate-slideInDown">
          <div
            className={`p-4 rounded-lg shadow-lg max-w-sm border-l-4 ${
              message.includes("Error")
                ? "bg-red-50 border-red-500 text-red-700"
                : "bg-green-50 border-green-500 text-green-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {message.includes("Error") ? "✕" : "✓"}
              </span>
              <p className="font-medium text-sm">{message}</p>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
        {currentUser?.role === "admin" ? (
          <AdminDashboard
            employees={employees}
            reviews={reviews}
            assignments={assignments}
            onAddEmployee={handleAddEmployee}
            onUpdateEmployee={handleUpdateEmployee}
            onDeleteEmployee={handleDeleteEmployee}
            onAddReview={handleAddReview}
            onUpdateReview={handleUpdateReview}
            onDeleteReview={handleDeleteReview}
            onAddAssignment={handleAddAssignment}
            onDeleteAssignment={handleDeleteAssignment}
          />
        ) : (
          <EmployeeFeedback
            employeeId={currentUser?.id}
            assignments={assignments}
            employees={employees}
            onSubmitFeedback={handleSubmitFeedback}
          />
        )}
      </main>
    </div>
  );
}

export default App;
