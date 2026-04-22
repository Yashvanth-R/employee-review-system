# Employee Performance Review System

A fullstack web application for managing employee performance reviews with feedback submission capabilities.

## Overview

This application allows:
- **Admins** to manage employees, create performance reviews, and assign reviewers
- **Employees** to submit feedback on their peers' performance reviews

## Technology Stack

### Backend
- **Runtime**: Node.js with ES Modules
- **Framework**: Express.js 4.18
- **CORS**: Enabled for frontend communication
- **API Style**: RESTful with JSON responses
- **Data Storage**: In-memory JavaScript objects (easily replaceable with a database)

### Frontend
- **Framework**: React 18.2
- **Build Tool**: Vite 4.3
- **HTTP Client**: Axios 1.4
- **Styling**: CSS3 with responsive design

## Project Structure

```
employee-review-app/
├── backend/
│   ├── controllers/          # Business logic for each resource
│   │   ├── employeeController.js
│   │   ├── reviewController.js
│   │   ├── assignmentController.js
│   │   └── feedbackController.js
│   ├── routes/               # API endpoint definitions
│   │   ├── employeeRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── assignmentRoutes.js
│   │   └── feedbackRoutes.js
│   ├── data/
│   │   └── db.js            # In-memory database and data access layer
│   ├── app.js               # Express server setup
│   └── package.json         # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── pages/           # Page components
│   │   │   ├── AdminDashboard.jsx    # Admin interface
│   │   │   ├── AdminDashboard.css
│   │   │   ├── EmployeeFeedback.jsx  # Employee feedback interface
│   │   │   └── EmployeeFeedback.css
│   │   ├── components/      # Reusable components
│   │   ├── api.js           # API client and endpoints
│   │   ├── App.jsx          # Main app component
│   │   ├── App.css
│   │   └── main.jsx         # React DOM render
│   ├── index.html           # HTML template
│   ├── vite.config.js       # Vite configuration
│   └── package.json         # Frontend dependencies
│
└── README.md                # This file
```

## API Endpoints

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Performance Reviews
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/:id` - Get review with assignments
- `POST /api/reviews` - Create performance review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Review Assignments
- `GET /api/assignments` - Get all assignments
- `GET /api/assignments/review/:reviewId` - Get assignments for a review
- `GET /api/assignments/pending/:reviewerId` - Get pending reviews for an employee (Employee View)
- `POST /api/assignments` - Assign reviewer to a review
- `DELETE /api/assignments/:id` - Remove assignment

### Feedback
- `GET /api/feedback` - Get all feedback
- `GET /api/feedback/:assignmentId` - Get feedback for an assignment
- `POST /api/feedback` - Submit feedback on an assignment

## Setup Instructions

### Prerequisites
- Node.js v16+ installed
- npm or yarn package manager

### Step 1: Clone/Download the Project

```bash
cd "c:\Users\yashvanth\Documents\Github\Employee management system"
```

### Step 2: Setup Backend

```bash
cd employee-review-app/backend
npm install
```

### Step 3: Setup Frontend

```bash
cd ../frontend
npm install
```

## Running the Application

### Start Backend Server

From the `backend/` directory:

```bash
npm start
```

The backend server will run on `http://localhost:5000`

You should see:
```
Server is running on http://localhost:5000
API Documentation:
  Health Check: http://localhost:5000/api/health
  Employees: http://localhost:5000/api/employees
  Reviews: http://localhost:5000/api/reviews
  Assignments: http://localhost:5000/api/assignments
  Feedback: http://localhost:5000/api/feedback
```

### Start Frontend Development Server

From the `frontend/` directory (in a new terminal):

```bash
npm run dev
```

The frontend will open at `http://localhost:3000`

## How to Use

### Admin Features

1. **Select Admin User**: The dropdown at the top defaults to "John Smith (admin)"
2. **Manage Employees**:
   - View all employees
   - Add new employees
   - Edit employee details
   - Delete employees

3. **Manage Performance Reviews**:
   - Create new reviews for specific employees
   - Set due dates and status
   - Update or delete reviews

4. **Assign Reviewers**:
   - Assign employees to review other employees' performance
   - Manage assignments (pending/completed)

### Employee Features

1. **Switch User**: Use the dropdown to select a non-admin employee (e.g., "Jane Doe" or "Bob Johnson")
2. **View Pending Reviews**: See all reviews assigned to you
3. **Submit Feedback**:
   - Click on a review card
   - Rate performance (1-5 stars)
   - Add constructive feedback
   - Submit

## Sample Data

The application comes pre-loaded with sample data:

### Employees
- John Smith (Admin) - Engineering
- Jane Doe (Employee) - Marketing
- Bob Johnson (Employee) - Sales

### Sample Reviews
- Q1 2026 Performance Review for Jane Doe
- Q1 2026 Performance Review for Bob Johnson

### Sample Assignments
- Bob reviews Jane
- John reviews Jane
- Jane reviews Bob

## Design Decisions & Assumptions

### Assumptions

1. **Authentication**: The application uses role-based access control (Admin vs Employee) without full authentication. In production, implement JWT tokens or similar.

2. **Data Persistence**: Uses in-memory storage. Data will reset when the server restarts. For production, use a database like MongoDB, PostgreSQL, or Firebase.

3. **User Context**: Users are selected via dropdown. In production, use proper session management and authentication.

4. **Feedback Anonymity**: Currently, feedback is tied to the reviewer. Can be modified to anonymous based on requirements.

5. **Review Workflow**: Simple workflow with three statuses: active, pending, completed. Can be extended with approval workflows.

6. **Concurrency**: No conflict resolution for simultaneous updates. Use version control or optimistic locking for production.

### Design Decisions

1. **RESTful API**: Clean separation between frontend and backend allows easy scaling and potential mobile client.

2. **React + Vite**: Modern SPA development with hot module reloading for faster development.

3. **Component-Based UI**: Reusable components make maintenance and feature additions easier.

4. **CORS Enabled**: Allows frontend and backend to run on different ports during development.

5. **Error Handling**: Basic error handling with user-friendly messages. Can be enhanced with logging and monitoring.

6. **No Database ORM**: Direct data manipulation keeps dependencies minimal. Use Prisma/Sequelize/Mongoose for databases.

## Key Features Implemented

 **Admin Dashboard**
- Employee CRUD operations
- Performance review management
- Reviewer assignment system

 **Employee View**
- List pending reviews requiring feedback
- Star rating system (1-5)
- Feedback submission form

 **API Endpoints** (9 endpoints across 4 resources)
- Employees (5 endpoints)
- Reviews (5 endpoints)
- Assignments (5 endpoints)
- Feedback (3 endpoints)

 **Frontend Pages**
- Admin Dashboard with tabbed interface
- Employee Feedback submission page
- User role-based view switching

## Future Enhancements

1. **Database Integration**: Replace in-memory storage with MongoDB/PostgreSQL
2. **Authentication**: Add JWT-based authentication and authorization
3. **Advanced Filters**: Search and filter reviews and employees
4. **Export Reports**: Generate PDF reports of reviews and feedback
5. **Email Notifications**: Notify employees of pending reviews
6. **Anonymous Feedback**: Option for anonymous feedback submissions
7. **Performance Analytics**: Dashboard showing feedback trends and ratings
8. **Revision History**: Track changes to reviews and feedback
9. **Mobile App**: React Native version for mobile access
10. **Real-time Updates**: WebSocket integration for live notifications

## Troubleshooting

### CORS Errors
- Ensure backend is running on port 5000
- Check that frontend is making requests to http://localhost:5000/api

### Port Already in Use
- Backend (5000): `npm run dev -- --port 5001`
- Frontend (3000): Set VITE_PORT environment variable

### Module Not Found Errors
- Run `npm install` in both backend and frontend directories
- Clear node_modules and reinstall if issues persist: `rm -r node_modules && npm install`

### API Requests Failing
- Test with: `curl http://localhost:5000/api/health`
- Check browser console for detailed error messages

## Performance Considerations

- **In-Memory Storage**: Works well for demo/prototype with <1000 records
- **API Response Time**: Direct data access keeps latency minimal
- **Frontend Rendering**: React efficiently handles updates for ~50 employees/reviews

## Security Notes

**Important**: This is a prototype/interview solution. For production:
1. Implement proper authentication (OAuth, JWT)
2. Add input validation and sanitization
3. Use HTTPS/TLS
4. Implement rate limiting
5. Add CSRF protection
6. Use secure headers (Content-Security-Policy, X-Frame-Options, etc.)
7. Implement role-based access control (RBAC) on backend
8. Validate all inputs server-side
9. Use environment variables for sensitive configuration
10. Add audit logging

## License

This project is provided as-is for educational and interview purposes.

## Support

For issues or questions, review the API documentation at:
- Backend: http://localhost:5000/api/health
- Frontend: http://localhost:3000
