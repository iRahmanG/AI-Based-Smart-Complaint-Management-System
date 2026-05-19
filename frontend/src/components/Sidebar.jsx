import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShieldCheck, LayoutDashboard, FileText, PlusCircle, Search, UserCircle, LogOut } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm ${
      isActive
        ? 'bg-primary-50 text-primary-700 font-semibold'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen shrink-0 sticky top-0">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <ShieldCheck size={26} className="text-primary-600" />
          <div>
            <span className="text-lg font-extrabold text-slate-900">CitizenCare</span>
            <span className="block text-xs text-slate-400 -mt-0.5">Smart Complaint Portal</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Main Menu</p>
        <NavLink to="/dashboard" className={navClass}>
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>
        <NavLink to="/new-complaint" className={navClass}>
          <PlusCircle size={18} /> Register Complaint
        </NavLink>
        <NavLink to="/my-complaints" className={navClass}>
          <FileText size={18} /> My Complaints
        </NavLink>
        <NavLink to="/resolved" className={navClass}>
          <FileText size={18} /> Resolved
        </NavLink>
        <NavLink to="/track" className={navClass}>
          <Search size={18} /> Track Complaint
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-slate-200 space-y-1">
        <NavLink to="/profile" className={navClass}>
          <UserCircle size={18} /> My Profile
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 font-medium text-sm w-full"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
