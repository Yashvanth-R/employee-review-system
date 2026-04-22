import bcrypt from "bcrypt";
import { generateToken } from "../middleware/authMiddleware.js";
// import * as db from "../data/db.js";

let users = [
  {
    id: 1,
    email: "admin@example.com",
    password: "$2b$10$iYlxlDuxKOlPBC6e8LlVK.MjWHCS4VYk9NxCO5u2j/yZkkQD5NJsW", // password: "admin123"
    role: "admin",
    name: "John Smith",
  },
  {
    id: 2,
    email: "user@example.com",
    password: "$2b$10$gokwZgfLx7303qPfPZUsJOqP211fltDgdMbcmZOP4xuNG7pvKAvuu", // password: "user123"
    role: "employee",
    name: "Jane Doe",
  },
];

export const register = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Email, password, and name are required" });
    }

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      name,
      role: role || "employee",
    };

    users.push(newUser);

    const token = generateToken(newUser.id, newUser.role);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(user.id, user.role);

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

export const getCurrentUser = (req, res) => {
  try {
    const user = users.find((u) => u.id === req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};
