# CitizenCare AI - Smart Complaint Management System

AI-powered Smart Complaint Management System developed using the MERN Stack for citizens to register, track, and manage complaints online.

---

## Project Overview

Smart Complaint System is a full-stack web application where citizens can:

- Register complaints online
- Track complaint status
- Receive AI-based complaint analysis
- Get department recommendations
- View complaint summaries
- Receive automated responses

The application uses:

- React.js for frontend
- Node.js + Express.js for backend
- MongoDB for database
- JWT Authentication for security
- AI APIs for complaint analysis

---

# Features

## Authentication
- User Signup
- User Login
- JWT Authentication
- Protected Routes
- Password Hashing using bcrypt

---

## Complaint Management
- Add complaints
- View all complaints
- Update complaint status
- Track complaint progress
- Search complaints by location
- Filter complaints by category

---

## AI Features
- Complaint Priority Detection
- Department Recommendation
- AI-generated Summary
- Auto-generated Response
- Complaint Urgency Detection

---

# Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js
- JWT
- bcryptjs
- Mongoose

## Database
- MongoDB Atlas

## AI Integration
- Gemini API / OpenAI API

## Deployment
- Render https://fai-based-smart-complaint-management.onrender.com/

---

# Folder Structure

```bash
├── backend/
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Complaint.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── ai.js
│   │   ├── auth.js
│   │   └── complaints.js
│   │
│   ├── .env
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   ├── components/
│   │   │
│   │   └── pages/
│   │       ├── Analytics.jsx
│   │       ├── ComplaintDetail.jsx
│   │       ├── Dashboard.jsx
│   │       ├── LandingPage.jsx
│   │       ├── Login.jsx
│   │       ├── MyComplaints.jsx
│   │       └── NewComplaint.jsx
│
└── README.md
