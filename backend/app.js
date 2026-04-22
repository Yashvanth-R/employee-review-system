import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import { verifyToken } from "./middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Public Routes
app.use("/api/auth", authRoutes);

// Protected Routes (require JWT authentication)
app.use("/api/employees", verifyToken, employeeRoutes);
app.use("/api/reviews", verifyToken, reviewRoutes);
app.use("/api/assignments", verifyToken, assignmentRoutes);
app.use("/api/feedback", verifyToken, feedbackRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running", timestamp: new Date() });
});

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
