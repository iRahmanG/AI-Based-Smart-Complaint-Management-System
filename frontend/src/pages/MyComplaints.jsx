import React, { useState, useEffect } from 'react';
import { Search, Filter, Clock, CheckCircle2, AlertCircle, MapPin, Tag, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const statusStyles = {
  'Pending': 'bg-amber-50 text-amber-700 border-amber-200',
  'Under Review': 'bg-blue-50 text-blue-700 border-blue-200',
  'In Progress': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Resolved': 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const priorityStyles = {
  'High': 'bg-red-50 text-red-600 border-red-200',
  'Medium': 'bg-orange-50 text-orange-600 border-orange-200',
  'Low': 'bg-slate-50 text-slate-500 border-slate-200',
};

const MyComplaints = ({ filterStatus }) => {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const res = await api.get('/complaints');
      setComplaints(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchComplaints(); }, []);

  const filtered = complaints.filter(c => {
    if (filterStatus && c.status !== filterStatus) return false;
    if (categoryFilter && c.category !== categoryFilter) return false;
    if (search) {
      const s = search.toLowerCase();
      return c.title.toLowerCase().includes(s) || c.location?.toLowerCase().includes(s) || c.description?.toLowerCase().includes(s);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          {filterStatus === 'Resolved' ? 'Resolved Complaints' : 'My Complaints'}
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          {filtered.length} complaint{filtered.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            className="form-input pl-10"
            placeholder="Search by title, location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="form-input w-40" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Roads">Roads</option>
          <option value="Water Supply">Water Supply</option>
          <option value="Electricity">Electricity</option>
          <option value="Sanitation">Sanitation</option>
          <option value="Public Safety">Public Safety</option>
        </select>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading complaints...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <CheckCircle2 size={48} className="mx-auto mb-4 text-slate-200" />
            <p className="text-slate-500 font-medium">No complaints found</p>
            <p className="text-slate-400 text-sm mt-1">
              {filterStatus === 'Resolved' ? 'No issues have been resolved yet.' : 'You haven\'t filed any complaints matching these filters.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map(c => (
              <div
                key={c._id}
                className="p-5 hover:bg-slate-50 transition-colors cursor-pointer group flex items-start justify-between gap-4"
                onClick={() => navigate(`/complaint/${c._id}`)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-semibold text-slate-900 text-base">{c.title}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[c.status] || statusStyles['Pending']}`}>
                      {c.status || 'Pending'}
                    </span>
                    {c.priority && (
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityStyles[c.priority] || priorityStyles['Medium']}`}>
                        {c.priority} Priority
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-1 mb-3">{c.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Tag size={12}/> {c.category}</span>
                    {c.location && <span className="flex items-center gap-1"><MapPin size={12}/> {c.location}</span>}
                    {c.department && <span className="flex items-center gap-1"><AlertCircle size={12}/> {c.department}</span>}
                    <span className="flex items-center gap-1"><Clock size={12}/> {new Date(c.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-500 transition-colors mt-1 shrink-0" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyComplaints;
