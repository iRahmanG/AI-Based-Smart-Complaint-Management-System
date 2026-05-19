import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Tag, Clock, CheckCircle2, Sparkles, AlertTriangle } from 'lucide-react';
import api from '../api';

const statusSteps = ['Pending', 'Under Review', 'In Progress', 'Resolved'];

const ComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/complaints/${id}`);
        setComplaint(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <div className="flex items-center justify-center h-64 text-slate-400">Loading complaint details...</div>;
  if (!complaint) return <div className="text-center py-20 text-slate-500">Complaint not found.</div>;

  const currentStep = statusSteps.indexOf(complaint.status || 'Pending');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-4 font-medium">
          <ArrowLeft size={16} /> Back to complaints
        </button>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900">{complaint.title}</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${
            complaint.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
            complaint.status === 'In Progress' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
            'bg-amber-50 text-amber-700 border-amber-200'
          }`}>{complaint.status || 'Pending'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Description Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide text-slate-400">Complaint Details</h2>
            <p className="text-slate-700 leading-relaxed">{complaint.description}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><Tag size={14}/> {complaint.category}</span>
              <span className="flex items-center gap-1.5"><MapPin size={14}/> {complaint.location}</span>
              <span className="flex items-center gap-1.5"><Clock size={14}/> Filed on {new Date(complaint.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })}</span>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-6 text-sm uppercase tracking-wide text-slate-400">Progress Timeline</h2>
            <div className="relative">
              <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-slate-200"></div>
              {statusSteps.map((step, i) => {
                const done = i <= currentStep;
                const active = i === currentStep;
                return (
                  <div key={step} className="flex items-start gap-4 mb-6 last:mb-0 relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border-2 ${
                      done ? 'bg-primary-600 border-primary-600 text-white' : 'bg-white border-slate-300 text-slate-300'
                    } ${active ? 'ring-4 ring-primary-100' : ''}`}>
                      <CheckCircle2 size={18} />
                    </div>
                    <div className="pt-1.5">
                      <p className={`font-semibold ${done ? 'text-slate-900' : 'text-slate-400'}`}>{step}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {active ? 'Current status' : done ? 'Completed' : 'Upcoming'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column — AI Panel */}
        <div className="space-y-4">
          {(complaint.aiSummary || complaint.department) && (
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 text-indigo-700 font-bold mb-4">
                <Sparkles size={18} /> AI Analysis
              </div>
              <div className="space-y-4 text-sm">
                {complaint.priority && (
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Priority</p>
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                      complaint.priority === 'High' ? 'bg-red-100 text-red-700' :
                      complaint.priority === 'Medium' ? 'bg-orange-100 text-orange-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>{complaint.priority}</span>
                  </div>
                )}
                {complaint.department && (
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Assigned To</p>
                    <p className="font-semibold text-indigo-700">{complaint.department}</p>
                  </div>
                )}
                {complaint.urgency && (
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Urgency</p>
                    <p className="font-medium text-slate-700">{complaint.urgency}</p>
                  </div>
                )}
                {complaint.aiSummary && (
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">AI Summary</p>
                    <p className="text-slate-600 italic">"{complaint.aiSummary}"</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {complaint.aiResponse && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Auto-Response</p>
              <p className="text-sm text-slate-600 leading-relaxed">{complaint.aiResponse}</p>
            </div>
          )}

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Contact</p>
            <p className="text-sm text-slate-700 font-medium">{complaint.name}</p>
            <p className="text-sm text-slate-500">{complaint.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;
