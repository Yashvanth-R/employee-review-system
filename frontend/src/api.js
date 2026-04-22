import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Added JWT token request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  register: (email, password, name) =>
    api.post("/auth/register", { email, password, name }),
  getCurrentUser: () => api.get("/auth/me"),
};

// Employee APIs
export const employeeAPI = {
  getAll: () => api.get("/employees"),
  getById: (id) => api.get(`/employees/${id}`),
  create: (data) => api.post("/employees", data),
  update: (id, data) => api.put(`/employees/${id}`, data),
  delete: (id) => api.delete(`/employees/${id}`),
};

// Performance Review APIs
export const reviewAPI = {
  getAll: () => api.get("/reviews"),
  getById: (id) => api.get(`/reviews/${id}`),
  create: (data) => api.post("/reviews", data),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`),
};

// Assignment APIs
export const assignmentAPI = {
  getAll: () => api.get("/assignments"),
  getByReviewId: (reviewId) => api.get(`/assignments/review/${reviewId}`),
  getPendingByReviewerId: (reviewerId) =>
    api.get(`/assignments/pending/${reviewerId}`),
  create: (data) => api.post("/assignments", data),
  delete: (id) => api.delete(`/assignments/${id}`),
};

// Feedback APIs
export const feedbackAPI = {
  getAll: () => api.get("/feedback"),
  getByAssignmentId: (assignmentId) => api.get(`/feedback/${assignmentId}`),
  submit: (data) => api.post("/feedback", data),
};

export default api;