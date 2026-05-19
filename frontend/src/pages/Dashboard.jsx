import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, AlertCircle, FileText, ChevronRight } from 'lucide-react';
import api from '../api';

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      const res = await api.get('/complaints');
      setComplaints(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const stats = [
    { label: 'Total Submitted', value: complaints.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Pending', value: complaints.filter(c => c.status !== 'Resolved').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: 'Resolved', value: complaints.filter(c => c.status === 'Resolved').length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'High Priority', value: complaints.filter(c => c.priority === 'High' || c.title.toLowerCase().includes('high')).length, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Dashboard</h1>
        <p className="text-slate-600">Track and manage your submitted civic issues.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-6 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">Recent Complaints</h2>
          <button className="text-sm font-medium text-primary-600 hover:text-primary-700">View All</button>
        </div>
        
        <div className="divide-y divide-slate-200">
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading your history...</div>
          ) : complaints.length === 0 ? (
            <div className="p-8 text-center text-slate-500">You haven't submitted any complaints yet.</div>
          ) : (
            complaints.map(c => (
              <div key={c._id} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-base font-bold text-slate-900">{c.title}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      c.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {c.status || 'Pending'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 truncate max-w-2xl mb-2">{c.description}</p>
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                    <span className="flex items-center gap-1"><FileText size={12}/> {c.category}</span>
                    <span className="flex items-center gap-1"><Clock size={12}/> {new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="text-slate-400" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
