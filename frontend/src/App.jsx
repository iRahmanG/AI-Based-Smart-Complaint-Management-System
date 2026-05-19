import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewComplaint from './pages/NewComplaint';
import MyComplaints from './pages/MyComplaints';
import ComplaintDetail from './pages/ComplaintDetail';
import Track from './pages/Track';
import Profile from './pages/Profile';
import AppLayout from './components/AppLayout';

const GOOGLE_CLIENT_ID = "1000000000000-dummyclientid.apps.googleusercontent.com";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return <AppLayout>{children}</AppLayout>;
};

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected citizen routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/new-complaint" element={<PrivateRoute><NewComplaint /></PrivateRoute>} />
          <Route path="/my-complaints" element={<PrivateRoute><MyComplaints /></PrivateRoute>} />
          <Route path="/resolved" element={<PrivateRoute><MyComplaints filterStatus="Resolved" /></PrivateRoute>} />
          <Route path="/complaint/:id" element={<PrivateRoute><ComplaintDetail /></PrivateRoute>} />
          <Route path="/track" element={<PrivateRoute><Track /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
