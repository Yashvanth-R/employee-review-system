import React, { useState } from "react";

export const EmployeeFeedback = ({ employeeId, assignments, employees, onSubmitFeedback }) => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [formData, setFormData] = useState({
    content: "",
    rating: 5,
  });

  const myAssignments = assignments.filter((a) => a.reviewerId === employeeId && a.status === "pending");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAssignment) {
      alert("Please select a review");
      return;
    }
    onSubmitFeedback(selectedAssignment.id, formData);
    setFormData({ content: "", rating: 5 });
    setSelectedAssignment(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Submit Feedback
        </h1>
        <div className="px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-semibold text-blue-800">
            {myAssignments.length > 0 ? `${myAssignments.length} pending` : "All caught up!"}
          </p>
        </div>
      </div>

      {myAssignments.length === 0 ? (
        <div className="card text-center py-16 bg-green-50 border-2 border-green-200 animate-slideInUp">
          <div className="text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-green-900 mb-2">All Reviews Complete</h2>
          <p className="text-green-800 text-base">No pending reviews requiring your feedback.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Reviews List */}
          <div className="lg:col-span-1 animate-slideInLeft">
            <div className="card sticky top-6">
              <h2 className="card-header">
                Your Pending Reviews
                <span className="inline-flex items-center justify-center w-6 h-6 text-sm font-bold text-white bg-blue-600 rounded-full ml-2">
                  {myAssignments.length}
                </span>
              </h2>
              <div className="space-y-3">
                {myAssignments.map((assignment, idx) => {
                  const employee = employees.find(
                    (e) => e.id === assignment.review?.employeeId
                  );
                  return (
                    <button
                      key={assignment.id}
                      onClick={() => setSelectedAssignment(assignment)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 animate-slideInUp ${
                        selectedAssignment?.id === assignment.id
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
                      }`}
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <h3 className="font-semibold text-gray-900">
                        {employee?.name}
                      </h3>
                      <p className="text-sm font-medium text-gray-700 mt-2">
                        {assignment.review?.title}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-xs text-gray-500">
                          Due: {assignment.review?.dueDate}
                        </p>
                        {selectedAssignment?.id === assignment.id && (
                          <span className="text-sm text-blue-600 font-bold">→</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Feedback Form */}
          {selectedAssignment && (
            <div className="lg:col-span-2 animate-slideInRight">
              <form onSubmit={handleSubmit} className="card">
                {/* Header */}
                <div className="mb-8 pb-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Provide Feedback
                  </h2>
                  <p className="text-lg text-gray-700 font-medium">
                    {employees.find(e => e.id === selectedAssignment.review?.employeeId)?.name}
                  </p>
                </div>

                {/* Review Details */}
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mb-8 animate-slideInDown">
                  <h3 className="font-bold text-gray-900 text-base mb-2">Review Details</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    {selectedAssignment.review?.description || "No description provided"}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-gray-700">
                    <span>Due: {selectedAssignment.review?.dueDate}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded font-semibold text-xs">
                      {selectedAssignment.review?.status}
                    </span>
                  </div>
                </div>

                {/* Rating Input */}
                <div className="mb-8 animate-slideInUp" style={{ animationDelay: "0.1s" }}>
                  <label className="block text-base font-bold text-gray-900 mb-4">
                    Performance Rating
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className={`text-3xl transition-all duration-300 cursor-pointer ${
                            star <= formData.rating
                              ? "text-yellow-400"
                              : "text-gray-300 hover:text-yellow-200"
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-blue-600">
                        {formData.rating}
                      </span>
                      <span className="text-gray-600 text-sm">/5</span>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    {["Poor", "Fair", "Good", "Very Good", "Excellent"][formData.rating - 1]}
                  </div>
                </div>

                {/* Comments Input */}
                <div className="mb-8 animate-slideInUp" style={{ animationDelay: "0.15s" }}>
                  <label className="block text-base font-bold text-gray-900 mb-3">
                    Feedback Comments
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    placeholder="Provide constructive feedback here. Be specific and professional."
                    className="input-field resize-vertical min-h-32"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    {formData.content.length}/500 characters
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors duration-300 shadow-sm text-base animate-slideInUp"
                  style={{ animationDelay: "0.2s" }}
                >
                  Submit Feedback
                </button>

                {/* Cancel Button */}
                <button
                  type="button"
                  onClick={() => setSelectedAssignment(null)}
                  className="w-full mt-3 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-300 text-sm"
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
