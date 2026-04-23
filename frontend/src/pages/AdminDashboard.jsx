import React, { useState } from "react";

export const AdminDashboard = ({
  employees,
  reviews,
  assignments,
  onAddEmployee,
  onUpdateEmployee,
  onDeleteEmployee,
  onAddReview,
  onUpdateReview,
  onDeleteReview,
  onAddAssignment,
  onDeleteAssignment,
}) => {
  const [activeTab, setActiveTab] = useState("employees");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  return (
    <div className="flex gap-6 animate-fadeIn">
      <div className="w-56 bg-white rounded-lg shadow-md p-6 h-fit sticky top-6 animate-slideInLeft border border-gray-100">
        <h2 className="text-lg font-bold mb-6 text-gray-900">Administration</h2>
        <nav className="space-y-2 flex flex-col">
          {[
            { id: "employees", label: "Employees" },
            { id: "reviews", label: "Reviews" },
            { id: "assignments", label: "Assignments" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setShowForm(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1">
        {activeTab === "employees" && (
          <EmployeesTab
            employees={employees}
            onAdd={onAddEmployee}
            onUpdate={onUpdateEmployee}
            onDelete={onDeleteEmployee}
            showForm={showForm}
            setShowForm={setShowForm}
            editingId={editingId}
            setEditingId={setEditingId}
          />
        )}
        {activeTab === "reviews" && (
          <ReviewsTab
            reviews={reviews}
            employees={employees}
            onAdd={onAddReview}
            onUpdate={onUpdateReview}
            onDelete={onDeleteReview}
            showForm={showForm}
            setShowForm={setShowForm}
            editingId={editingId}
            setEditingId={setEditingId}
          />
        )}
        {activeTab === "assignments" && (
          <AssignmentsTab
            assignments={assignments}
            reviews={reviews}
            employees={employees}
            onAdd={onAddAssignment}
            onDelete={onDeleteAssignment}
          />
        )}
      </div>
    </div>
  );
};

const EmployeesTab = ({
  employees,
  onAdd,
  onUpdate,
  onDelete,
  showForm,
  setShowForm,
  editingId,
  setEditingId,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "employee",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      onUpdate(editingId, formData);
      setEditingId(null);
    } else {
      onAdd(formData);
    }
    setFormData({ name: "", email: "", department: "", role: "employee" });
    setShowForm(false);
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setEditingId(employee.id);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <button
          className={`btn-small ${
            showForm
              ? "btn-secondary"
              : "btn-primary"
          }`}
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ name: "", email: "", department: "", role: "employee" });
          }}
        >
          {showForm ? "Cancel" : "Add Employee"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card">
          <h2 className="card-header">{editingId ? "Edit Employee" : "Add New Employee"}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="input-field"
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn-primary w-full">
              {editingId ? "Update Employee" : "Add Employee"}
            </button>
          </div>
        </form>
      )}

      <div className="card overflow-x-auto">
        {employees.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No employees found</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Department</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Role</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="table-row">
                  <td className="px-4 py-3 text-gray-900">{emp.name}</td>
                  <td className="px-4 py-3 text-gray-600">{emp.email}</td>
                  <td className="px-4 py-3 text-gray-600">{emp.department}</td>
                  <td className="px-4 py-3">
                    <span className="badge-info">
                      {emp.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button onClick={() => handleEdit(emp)} className="btn-secondary btn-small">
                      Edit
                    </button>
                    <button onClick={() => onDelete(emp.id)} className="btn-danger btn-small">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const ReviewsTab = ({
  reviews,
  employees,
  onAdd,
  onUpdate,
  onDelete,
  showForm,
  setShowForm,
  editingId,
  setEditingId,
}) => {
  const [formData, setFormData] = useState({
    employeeId: "",
    title: "",
    description: "",
    dueDate: "",
    status: "active",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      onUpdate(editingId, formData);
      setEditingId(null);
    } else {
      onAdd(formData);
    }
    setFormData({
      employeeId: "",
      title: "",
      description: "",
      dueDate: "",
      status: "active",
    });
    setShowForm(false);
  };

  const handleEdit = (review) => {
    setFormData(review);
    setEditingId(review.id);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Performance Reviews</h1>
        <button
          className={`btn-small ${
            showForm
              ? "btn-secondary"
              : "btn-primary"
          }`}
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              employeeId: "",
              title: "",
              description: "",
              dueDate: "",
              status: "active",
            });
          }}
        >
          {showForm ? "Cancel" : "Add Review"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card">
          <h2 className="card-header">{editingId ? "Edit Review" : "Add New Review"}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
              <select
                value={formData.employeeId}
                onChange={(e) =>
                  setFormData({ ...formData, employeeId: e.target.value })
                }
                className="input-field"
                required
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="input-field resize-vertical min-h-[100px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="input-field"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <button type="submit" className="btn-primary w-full">
              {editingId ? "Update Review" : "Add Review"}
            </button>
          </div>
        </form>
      )}

      <div className="card overflow-x-auto">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No reviews found</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Employee</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Title</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Due Date</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => {
                const employee = employees.find((e) => e.id === review.employeeId);
                return (
                  <tr key={review.id} className="table-row">
                    <td className="px-4 py-3 text-gray-900">{employee?.name}</td>
                    <td className="px-4 py-3 text-gray-900 font-medium">{review.title}</td>
                    <td className="px-4 py-3 text-gray-600">{review.dueDate}</td>
                    <td className="px-4 py-3">
                      <span className={`${
                        review.status === "completed" 
                          ? "badge-success"
                          : review.status === "pending"
                          ? "badge-warning"
                          : "badge-info"
                      }`}>
                        {review.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      <button onClick={() => handleEdit(review)} className="btn-secondary btn-small">
                        Edit
                      </button>
                      <button onClick={() => onDelete(review.id)} className="btn-danger btn-small">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const AssignmentsTab = ({
  assignments,
  reviews,
  employees,
  onAdd,
  onDelete,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    reviewId: "",
    reviewerId: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ reviewId: "", reviewerId: "" });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Review Assignments</h1>
        <button
          className={`btn-small ${
            showForm
              ? "btn-secondary"
              : "btn-primary"
          }`}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Assign Reviewer"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card">
          <h2 className="card-header">Assign a New Reviewer</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Performance Review</label>
              <select
                value={formData.reviewId}
                onChange={(e) =>
                  setFormData({ ...formData, reviewId: e.target.value })
                }
                className="input-field"
                required
              >
                <option value="">Select Review</option>
                {reviews.map((review) => {
                  const emp = employees.find((e) => e.id === review.employeeId);
                  return (
                    <option key={review.id} value={review.id}>
                      {emp?.name} - {review.title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reviewer</label>
              <select
                value={formData.reviewerId}
                onChange={(e) =>
                  setFormData({ ...formData, reviewerId: e.target.value })
                }
                className="input-field"
                required
              >
                <option value="">Select Reviewer</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn-primary w-full">
              Assign Reviewer
            </button>
          </div>
        </form>
      )}

      <div className="card overflow-x-auto">
        {assignments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No assignments found</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Review</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Reviewer</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => {
                const review = reviews.find((r) => r.id === assignment.reviewId);
                const emp = employees.find((e) => e.id === review?.employeeId);
                const reviewer = employees.find(
                  (e) => e.id === assignment.reviewerId
                );
                return (
                  <tr key={assignment.id} className="table-row">
                    <td className="px-4 py-3 text-gray-900">{emp?.name} - {review?.title}</td>
                    <td className="px-4 py-3 text-gray-900 font-medium">{reviewer?.name}</td>
                    <td className="px-4 py-3">
                      <span className={`${
                        assignment.status === "completed"
                          ? "badge-success"
                          : "badge-info"
                      }`}>
                        {assignment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => onDelete(assignment.id)}
                        className="btn-danger btn-small"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
