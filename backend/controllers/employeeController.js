import * as db from "../data/db.js";

// Get all employees
export const getEmployees = (req, res) => {
  try {
    const employees = db.getAllEmployees();
    res.json({
      success: true,
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching employees",
      error: error.message,
    });
  }
};

// Get employee by ID
export const getEmployeeById = (req, res) => {
  try {
    const { id } = req.params;
    const employee = db.getEmployeeById(parseInt(id));
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }
    res.json({
      success: true,
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching employee",
      error: error.message,
    });
  }
};

// Create employee
export const createEmployee = (req, res) => {
  try {
    const { name, email, department, role } = req.body;

    if (!name || !email || !department) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and department are required",
      });
    }

    const employee = db.createEmployee({
      name,
      email,
      department,
      role: role || "employee",
    });

    res.status(201).json({
      success: true,
      data: employee,
      message: "Employee created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating employee",
      error: error.message,
    });
  }
};

// Update employee
export const updateEmployee = (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const employee = db.updateEmployee(parseInt(id), updateData);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.json({
      success: true,
      data: employee,
      message: "Employee updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating employee",
      error: error.message,
    });
  }
};

// Delete employee
export const deleteEmployee = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = db.deleteEmployee(parseInt(id));

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting employee",
      error: error.message,
    });
  }
};
