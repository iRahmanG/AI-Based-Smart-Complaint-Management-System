import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, Info } from 'lucide-react';

const Topbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate('/track', { state: { trackId: search.trim() } });
      setSearch('');
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-50 relative">
      <form onSubmit={handleSearch} className="flex-1 max-w-sm">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={15} className="text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="Search complaint by title or keyword..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </form>

      <div className="flex items-center gap-3 relative">
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute top-12 right-12 w-80 bg-white border border-slate-200 shadow-lg rounded-xl overflow-hidden z-50">
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <span className="font-bold text-slate-800 text-sm">Notifications</span>
              <span className="text-xs text-primary-600 font-medium cursor-pointer">Mark all as read</span>
            </div>
            <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
              <div className="p-4 hover:bg-slate-50 cursor-pointer transition-colors flex gap-3">
                <div className="mt-0.5 text-primary-500"><Info size={16} /></div>
                <div>
                  <p className="text-sm font-medium text-slate-800 mb-0.5">Welcome to CitizenCare AI</p>
                  <p className="text-xs text-slate-500">Your account is ready. You can now register public issues.</p>
                  <p className="text-xs text-slate-400 mt-1">Just now</p>
                </div>
              </div>
              <div className="p-4 hover:bg-slate-50 cursor-pointer transition-colors flex gap-3">
                <div className="mt-0.5 text-emerald-500"><Info size={16} /></div>
                <div>
                  <p className="text-sm font-medium text-slate-800 mb-0.5">System Update</p>
                  <p className="text-xs text-slate-500">AI automated routing is now active for all departments.</p>
                  <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
                </div>
              </div>
            </div>
            <div className="p-2 text-center border-t border-slate-100">
              <button className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">View all notifications</button>
            </div>
          </div>
        )}

        <button
          className="flex items-center gap-2 pl-3 pr-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
          onClick={() => navigate('/profile')}
        >
          <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-700">
            Me
          </div>
          <span className="text-sm font-medium text-slate-700">My Account</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
