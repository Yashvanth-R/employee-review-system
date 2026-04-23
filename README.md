# Employee Review System

A full-stack web application for managing employee performance reviews with feedback submission capabilities. This project demonstrates a complete solution for an employee feedback platform where admins can manage employees and reviews, while employees can submit peer feedback.

---

## Challenge Overview

### Core Requirements
1. **Admin Dashboard** - Add/remove/update/view employees, manage performance reviews, assign reviewers
2. **Employee View** - List pending reviews requiring feedback, submit feedback
3. **Server-side API** - RESTful API with 9+ endpoints across 4 resources
4. **Frontend Integration** - React-based SPA communicating with backend via REST APIs
5. **Running Solution** - Complete, functional application with sample data

---

## High-Level Architecture & Design

### Design Principles
- **Separation of Concerns**: Frontend and backend are completely decoupled via REST API
- **Router-Controller Pattern**: Express routes delegate to controllers for cleaner code
- **Role-Based Access**: Different UI/functionality based on admin vs employee role
- **RESTful API Design**: Standard HTTP methods (GET, POST, PUT, DELETE) for CRUD operations
- **Stateless Server**: Each request is independent, enabling horizontal scaling

---

## Technology Stack

### Backend
- **Runtime**: Node.js v16+ with ES Modules (modern JavaScript)
- **Framework**: Express.js 4.18 - Lightweight, fast HTTP server framework
- **CORS**: Enabled for secure cross-origin communication between frontend and backend
- **API Style**: RESTful with JSON request/response format
- **Data Storage**: In-memory JavaScript objects (production-ready for database migration)

**Why these choices?**
- Express is lightweight and perfect for rapid prototyping and APIs
- ES modules provide modern JavaScript syntax and better code organization
- In-memory storage allows quick iteration without database setup

### Frontend
- **Framework**: React 18.2 - Component-based UI library for interactive web apps
- **Build Tool**: Vite 4.3 - Ultra-fast modern bundler with HMR (Hot Module Replacement)
- **HTTP Client**: Axios 1.4 - Promise-based HTTP client for API communication
- **Styling**: Tailwind CSS + Custom CSS3 - Utility-first styling for rapid UI development
- **State Management**: React hooks (useState, useEffect) - Built-in React state management

**Why these choices?**
- React enables reusable components and reactive UI updates
- Vite provides instant feedback during development with fast build times
- Tailwind provides pre-built utilities for consistent, responsive design
- React hooks keep state management simple without external libraries

---

## Project Structure

```
employee-review-system/
├── backend/
│   ├── controllers/                    # Business logic for each resource
│   │   ├── employeeController.js       # Employee CRUD operations
│   │   ├── reviewController.js         # Review management logic
│   │   ├── assignmentController.js     # Reviewer assignment logic
│   │   ├── feedbackController.js       # Feedback submission logic
│   │   └── authController.js           # Authentication logic
│   │
│   ├── routes/                         # API endpoint definitions
│   │   ├── employeeRoutes.js           # /api/employees routes
│   │   ├── reviewRoutes.js             # /api/reviews routes
│   │   ├── assignmentRoutes.js         # /api/assignments routes
│   │   ├── feedbackRoutes.js           # /api/feedback routes
│   │   └── authRoutes.js               # /api/auth routes
│   │
│   ├── middleware/
│   │   └── authMiddleware.js           # JWT authentication verification
│   │
│   ├── data/
│   │   └── db.js                       # In-memory database with sample data
│   │
│   ├── app.js                          # Express server initialization & routes
│   ├── generateHashes.js               # Password hash generation utility
│   ├── package.json                    # Backend dependencies & scripts
│   └── node_modules/                   # Installed dependencies
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx               # Authentication page
│   │   │   ├── AdminDashboard.jsx      # Admin panel (employees, reviews, assignments)
│   │   │   ├── AdminDashboard.css      # Admin styles
│   │   │   ├── EmployeeFeedback.jsx    # Employee feedback submission page
│   │   │   └── EmployeeFeedback.css    # Employee page styles
│   │   │
│   │   ├── App.jsx                     # Main app component & state management
│   │   ├── App.css                     # Global app styles
│   │   ├── index.css                   # Base styles & Tailwind imports
│   │   ├── api.js                      # Axios API client with interceptors
│   │   ├── main.jsx                    # React DOM entry point
│   │   └── node_modules/               # Installed dependencies
│   │
│   ├── public/                         # Static assets
│   ├── index.html                      # HTML template
│   ├── vite.config.js                  # Vite configuration
│   ├── tailwind.config.js              # Tailwind CSS configuration
│   ├── postcss.config.js               # PostCSS configuration
│   ├── package.json                    # Frontend dependencies & scripts
│
├── README.md                           # This file
└── .gitignore                          # Root level git ignore
```

---

## API Endpoints Documentation

### Authentication Endpoints (`/api/auth`)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/login` | Login with email & password, returns JWT token |
| POST | `/api/auth/register` | Register new user account |
| GET | `/api/auth/me` | Get current authenticated user info |

**Example Login Request:**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "name": "John Smith",
    "email": "john@example.com",
    "role": "admin"
  }
}
```

### Employees Endpoints (`/api/employees`)
| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---|
| GET | `/api/employees` | Get all employees | Yes |
| GET | `/api/employees/:id` | Get single employee details | Yes |
| POST | `/api/employees` | Create new employee (Admin only) | Yes |
| PUT | `/api/employees/:id` | Update employee details (Admin only) | Yes |
| DELETE | `/api/employees/:id` | Delete employee (Admin only) | Yes |

**Example: Create Employee**
```json
POST /api/employees
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "department": "Marketing",
  "role": "employee"
}
```

### Performance Reviews Endpoints (`/api/reviews`)
| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---|
| GET | `/api/reviews` | Get all reviews | Yes |
| GET | `/api/reviews/:id` | Get review with assignments | Yes |
| POST | `/api/reviews` | Create performance review (Admin only) | Yes |
| PUT | `/api/reviews/:id` | Update review details (Admin only) | Yes |
| DELETE | `/api/reviews/:id` | Delete review (Admin only) | Yes |

### Review Assignments Endpoints (`/api/assignments`)
| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---|
| GET | `/api/assignments` | Get all assignments | Yes |
| GET | `/api/assignments/review/:reviewId` | Get assignments for a review | Yes |
| GET | `/api/assignments/pending/:reviewerId` | Get pending reviews for employee | Yes |
| POST | `/api/assignments` | Assign reviewer to review (Admin only) | Yes |
| DELETE | `/api/assignments/:id` | Remove assignment (Admin only) | Yes |

### Feedback Endpoints (`/api/feedback`)
| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---|
| GET | `/api/feedback` | Get all feedback submissions | Yes |
| GET | `/api/feedback/:assignmentId` | Get feedback for assignment | Yes |
| POST | `/api/feedback` | Submit feedback on assignment | Yes |

**Example: Submit Feedback**
```json
POST /api/feedback
{
  "assignmentId": 1,
  "rating": 4,
  "comments": "Great performance on the Q1 project!"
}
```

---

## Design Decisions & Assumptions

### Design Decisions

1. **In-Memory Data Storage**
   - **Decision**: Use JavaScript objects stored in memory instead of a database
   - **Rationale**: Simplifies setup for demo/prototype, data persists during server runtime
   - **Trade-off**: Data lost on server restart
   - **Production Path**: Replace with MongoDB, PostgreSQL, or Firebase

2. **JWT Authentication**
   - **Decision**: Use JWT tokens for stateless authentication
   - **Rationale**: Enables API scalability, supports microservices, industry standard
   - **Implementation**: Tokens stored in localStorage, validated via middleware

3. **Role-Based Access Control (RBAC)**
   - **Decision**: Two-role system: Admin and Employee
   - **Rationale**: Simplifies initial implementation, covers use cases
   - **Admin Capabilities**: Full CRUD for employees, reviews, assignments
   - **Employee Capabilities**: View pending reviews, submit feedback

4. **Component-Based Frontend Architecture**
   - **Decision**: Split into page-level components (AdminDashboard, EmployeeFeedback, Login)
   - **Rationale**: Clear separation of concerns, easier to maintain and extend
   - **State Management**: Lift state to App.jsx for global state (authentication, data)

5. **RESTful API Design**
   - **Decision**: Standard HTTP verbs (GET, POST, PUT, DELETE) with resource-based URLs
   - **Rationale**: Industry standard, predictable, easy to document, works with any frontend
   - **JSON Format**: All requests/responses use JSON for consistency

6. **Minimal Dependencies**
   - **Decision**: Only include essential libraries (Express, React, Axios, Tailwind)
   - **Rationale**: Reduces complexity, faster development, smaller bundle size
   - **Trade-off**: More code for features typically handled by libraries

### Assumptions

1. **No Real Database**
   - Assumption: Data is stored in memory and resets on server restart
   - Implication: Suitable only for demo/prototype
   - Production Note: Integrate MongoDB/PostgreSQL via migrations

2. **No Email Verification**
   - Assumption: Registration bypasses email verification
   - Implication: Simplified authentication flow for demo
   - Production Note: Add email verification via identity service

3. **No Rate Limiting**
   - Assumption: No protection against brute force or DDoS attacks
   - Implication: Demo application only
   - Production Note: Implement rate limiting middleware

4. **Single Server Instance**
   - Assumption: Application runs on single Node.js process
   - Implication: No session sharing across multiple servers
   - Production Note: Use Redis for session management if scaling

5. **Frontend Hosted Locally**
   - Assumption: Frontend and backend run on same machine/localhost
   - Implication: CORS configured for local development
   - Production Note: Deploy to separate domains, update CORS policies

6. **Anonymous Feedback Not Supported**
   - Assumption: Feedback is tied to the reviewer's identity
   - Implication: Employees know who reviewed them
   - Enhancement: Add anonymous feedback option with admin override

7. **Synchronous Operations**
   - Assumption: No async job queues or background processing
   - Implication: All operations complete within HTTP request/response cycle
   - Production Note: Use Bull, RabbitMQ for long-running operations

8. **Sample Data Pre-loaded**
   - Assumption: Database comes with 3 employees, 2 reviews, and assignments
   - Implication: Demo-ready without manual setup
   - Production Note: Use proper seed management

---

## Getting Started - Setup Instructions for First-Time Users

This section provides step-by-step instructions to get the application running locally on your machine.

### Step 1: Clone/Download the Project

**Option A: Using Git (Recommended)**
```bash
git clone <repository-url>
cd employee-review-system
```

**Option B: Using ZIP Download**
1. Download the ZIP file
2. Extract to your desired location
3. Open terminal in the extracted folder

### Step 2: Setup Backend Server

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

**What this does:**
- Reads `package.json` to identify required dependencies
- Downloads packages from npm registry to `node_modules/` folder
- Creates `package-lock.json` for reproducible installations

**Expected Output:**
```
added 64 packages in 12s
```

### Step 3: Setup Frontend Application

Open a **new terminal** and navigate to the frontend directory:

```bash
cd frontend
npm install
```

**Same process as backend** - installs React, Vite, Tailwind, and other dependencies.

---

## Running the Application

### Step 1: Start the Backend Server

From the `backend/` directory, run:

```bash
npm start
```

**Expected output:**
```
Server is running on http://localhost:5000

API Documentation:
  Health Check: http://localhost:5000/api/health
  Employees: http://localhost:5000/api/employees
  Reviews: http://localhost:5000/api/reviews
  Assignments: http://localhost:5000/api/assignments
  Feedback: http://localhost:5000/api/feedback
```

**Keep this terminal running** - this is your backend server.

### Step 2: Start the Frontend Application

Open a **new terminal** and navigate to `frontend/` directory, then run:

```bash
npm run dev
```

**Expected output:**
```
VITE v4.3.0 ready in XXX ms

➜  Local:   http://localhost:5000
➜  press h to show help
```

Note: Frontend automatically opens in your default browser.

### Step 3: Access the Application

**Frontend**: Open http://localhost:3000 in your browser

**Backend API**: http://localhost:5000/api

---

## Sample Login Credentials

The application comes pre-loaded with sample users. Use these to test:

### Admin Account
```
Email: admin@example.com
Password: admin123
Role: Admin
Permissions: Full CRUD for employees, reviews, assignments
```

### Employee Accounts
```
Email: user@example.com
Password: user123
Name: Smith
Role: Employee
Department: Marketing

Email: user1@example.com
Password: user1234
Name: Suraj
Role: Employee
Department: IT
(Above all are pre-loaded in the in-memory database for testing purposes.)
```

---

## Features Implemented

### Admin Dashboard Features
- **View All Employees** - Table with employee details (name, email, department, role)
- **Add Employee** - Form to create new employee with validation
- **Update Employee** - Edit employee details
- **Delete Employee** - Remove employee from system
- **Manage Performance Reviews** - Create, view, update, delete reviews
- **Assign Reviewers** - Assign employees to review other employees
- **View Assignments** - See all reviewer assignments
- **Track Feedback Status** - View which assignments have received feedback

### Employee Features
- **View Pending Reviews** - List all reviews requiring their feedback
- **Submit Feedback** - Rate (1-5 stars) and add constructive comments
- **View Feedback History** - See feedback already submitted
- **Assignment Details** - View who assigned them to review

### General Features
- **Authentication System** - Login with email/password, JWT tokens
- **Role-Based UI** - Different interfaces for admin vs employee
- **Error Handling** - User-friendly error messages
- **Success Notifications** - Toast messages for all operations
- **Responsive Design** - Works on desktop and tablet
- **Data Validation** - Client-side and server-side validation

---

## How to Use

### As an Admin

1. **Login** with admin credentials (john@example.com / admin123)
2. **Employees Tab**:
   - View employee list
   - Click "Edit" to modify employee info
   - Click "Delete" to remove employee
   - Use form at top to add new employee
3. **Performance Reviews Tab**:
   - Create new review for specific employee
   - Set due dates
   - Update review status (active, pending, completed)
4. **Assignments Tab**:
   - Assign employees to review others
   - View assignment status
   - Track completed feedback

### As an Employee

1. **Login** with employee credentials (jane@example.com or bob@example.com / employee123)
2. **View Pending Reviews** - Dashboard shows all assigned reviews
3. **Submit Feedback**:
   - Click on a review card to open it
   - Select rating (1-5 stars)
   - Add feedback comments
   - Click "Submit Feedback"
4. **Track Status** - Submitted feedback shows as "completed"

---

## Project Architecture Deep Dive

### Backend Architecture

**Request Flow:**
```
HTTP Request
    ↓
Express Middleware (CORS, Auth)
    ↓
Route Handler (/api/employees)
    ↓
Controller (employeeController.js)
    ↓
Data Layer (db.js)
    ↓
In-Memory Store
    ↓
Response (JSON)
```

**Key Files Explained:**

- **app.js**: Initializes Express, registers routes, starts server
- **routes/**: Define API endpoints and map to controllers
- **controllers/**: Contain business logic, data manipulation, error handling
- **data/db.js**: In-memory database with CRUD functions
- **middleware/authMiddleware.js**: Validates JWT tokens on protected routes

### Frontend Architecture

**Component Hierarchy:**
```
App.jsx (Main component, state management)
├── Login.jsx (When unauthenticated)
├── AdminDashboard.jsx (When admin logged in)
│   ├── Employees Tab
│   ├── Reviews Tab
│   └── Assignments Tab
└── EmployeeFeedback.jsx (When employee logged in)
    ├── Pending Reviews List
    └── Feedback Form
```

**Data Flow:**
```
User Action (click button)
    ↓
Event Handler
    ↓
axios API call
    ↓
Backend processing
    ↓
Response received
    ↓
setState (React state update)
    ↓
Component re-renders
    ↓
UI updated
```
---
