# DemoPMS 🚀

A full-stack **Project Management System (PMS)** built using **React, NestJS, Prisma, PostgreSQL, and JWT Authentication**.

This project allows users to manage projects and tasks with authentication, role-based access control, pagination, backend sorting/filtering, and progress tracking.

---

## Features ✨

### Authentication & Security
- JWT Authentication
- Register/Login system
- Password validation
- Protected routes
- Logout functionality

### Role-Based Access Control (RBAC)
- **ADMIN**
  - Create Projects
  - Update Projects
  - Delete Projects

- **USER**
  - View Projects
  - View Tasks
  - Update task completion

### Project Management
- Create Projects
- View Project Details
- Delete Projects
- Project Progress Tracking
- Progress Bars

### Task Management
- Add Tasks
- Delete Tasks
- Mark Tasks as Completed
- Task Pagination

### Pagination
- Project Pagination
- Task Pagination
- Previous / Next Navigation

### Sorting & Filtering
#### Backend Sorting
- Sort by:
  - ID
  - Name
  - Status
  - Priority

#### Sorting Order
- Ascending
- Descending

#### Backend Filtering
- Filter by Status
- Filter by Priority

---

## Tech Stack 🛠️

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- NestJS
- Prisma ORM
- JWT Authentication
- bcryptjs

### Database
- PostgreSQL

---

## Project Structure 📂

```txt
frontend/
├── src/
│   ├── pages/
│   ├── components/
│   └── App.jsx

backend/
├── src/
│   ├── auth/
│   ├── projects/
│   ├── tasks/
│   └── prisma/