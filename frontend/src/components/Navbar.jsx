import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link" style={{ fontSize: '1.25rem', fontWeight: '700' }}>
        <span className="gradient-text">Smart</span>Complaint
      </Link>
      
      <div className="nav-links">
        {token ? (
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/new-complaint" className="nav-link">New Complaint</Link>
            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
