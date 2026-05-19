import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Clock, CheckCircle2, MapPin, Sparkles, ChevronRight } from 'lucide-react';
import api from '../api';

const statusSteps = ['Pending', 'Under Review', 'In Progress', 'Resolved'];

const Track = () => {
  const location = useLocation();
  const [query, setQuery] = useState(location.state?.trackId || '');
  const [results, setResults] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.trackId) {
      triggerTrack(location.state.trackId);
    }
  }, [location.state]);

  const triggerTrack = async (searchQuery) => {
    if (!searchQuery) return;
    setLoading(true);
    setError('');
    setResults([]);
    setSelectedComplaint(null);
    try {
      // Use the search endpoint to allow title/location searching
      const res = await api.get(`/complaints/search/query?q=${searchQuery.trim()}`);
      if (res.data && res.data.length > 0) {
        setResults(res.data);
        if (res.data.length === 1) {
          setSelectedComplaint(res.data[0]);
        }
      } else {
        setError('No complaints found matching that search. Please check and try again.');
      }
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTrack = (e) => {
    e.preventDefault();
    triggerTrack(query);
  };

  const currentStep = selectedComplaint ? statusSteps.indexOf(selectedComplaint.status || 'Pending') : -1;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Track Your Complaint</h1>
        <p className="text-slate-500 text-sm mt-1">Enter a complaint title, keyword, or ID to see real-time status.</p>
      </div>

      <form onSubmit={handleTrack} className="flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            className="form-input pl-10"
            placeholder="Search by title, keyword, or location..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary px-6" disabled={loading}>
          {loading ? 'Searching...' : 'Track'}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-sm">{error}</div>
      )}

      {/* List of results if multiple */}
      {results.length > 1 && !selectedComplaint && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 text-sm font-semibold text-slate-700">
            Found {results.length} matching complaints. Please select one:
          </div>
          <div className="divide-y divide-slate-100">
            {results.map(c => (
              <div 
                key={c._id} 
                className="p-4 hover:bg-slate-50 cursor-pointer flex justify-between items-center group transition-colors"
                onClick={() => setSelectedComplaint(c)}
              >
                <div>
                  <h3 className="font-bold text-slate-900">{c.title}</h3>
                  <div className="flex gap-3 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><MapPin size={12}/> {c.location}</span>
                    <span className="flex items-center gap-1"><Clock size={12}/> {new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                    c.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>{c.status || 'Pending'}</span>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Complaint Detail View */}
      {selectedComplaint && (
        <div className="space-y-4">
          {results.length > 1 && (
            <button 
              onClick={() => setSelectedComplaint(null)} 
              className="text-sm text-primary-600 hover:text-primary-700 font-medium mb-2 inline-block"
            >
              ← Back to search results
            </button>
          )}
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{selectedComplaint.title}</h2>
                <div className="flex gap-3 mt-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><MapPin size={13}/> {selectedComplaint.location}</span>
                  <span className="flex items-center gap-1"><Clock size={13}/> {new Date(selectedComplaint.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                selectedComplaint.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>{selectedComplaint.status || 'Pending'}</span>
            </div>

            {/* Progress bar */}
            <div className="mt-6">
              <div className="flex justify-between mb-3">
                {statusSteps.map((step, i) => (
                  <div key={step} className={`text-xs font-medium text-center ${i <= currentStep ? 'text-primary-700' : 'text-slate-300'}`} style={{width: '25%'}}>
                    {step}
                  </div>
                ))}
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / statusSteps.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {selectedComplaint.department && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-indigo-700 font-semibold mb-2">
                <Sparkles size={16}/> AI Routing
              </div>
              <p className="text-sm text-slate-700">Your complaint has been assigned to: <strong className="text-indigo-700">{selectedComplaint.department}</strong></p>
              {selectedComplaint.urgency && <p className="text-xs text-slate-500 mt-1">Estimated resolution: {selectedComplaint.urgency}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Track;
