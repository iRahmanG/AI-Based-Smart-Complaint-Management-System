import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ChevronRight, UploadCloud } from 'lucide-react';
import api from '../api';

const NewComplaint = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', title: '', description: '', category: 'Roads', location: ''
  });
  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // 1. AI Analysis
      const aiResponse = await api.post('/ai/analyze', {
        title: formData.title,
        description: formData.description,
        category: formData.category
      });
      
      const analysis = aiResponse.data;
      setAiResult(analysis);

      // 2. Save Complaint with AI Data
      const fullData = {
        ...formData,
        priority: analysis.priority,
        department: analysis.department,
        aiSummary: analysis.summary,
        aiResponse: analysis.response,
        urgency: analysis.urgency || 'Normal',
        sentiment: analysis.sentiment || 'Neutral'
      };

      await api.post('/complaints', fullData);
      setSuccess(true);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting complaint');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto mt-12 text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
          <Sparkles size={40} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Complaint Registered!</h2>
        <p className="text-slate-600 mb-8 text-lg">Our AI has successfully analyzed and routed your issue to the {aiResult?.department}.</p>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-left mb-8">
          <h3 className="font-bold text-slate-900 mb-4 border-b pb-2">AI Analysis Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-slate-500 block">Assessed Priority</span><span className="font-semibold text-red-600">{aiResult?.priority}</span></div>
            <div><span className="text-slate-500 block">Assigned Dept</span><span className="font-semibold text-primary-600">{aiResult?.department}</span></div>
            <div className="col-span-2"><span className="text-slate-500 block">Auto-Response</span><span className="italic text-slate-700">{aiResult?.response}</span></div>
          </div>
        </div>

        <button onClick={() => navigate('/dashboard')} className="btn-primary w-full max-w-sm mx-auto">
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Register a New Issue</h1>
        <p className="text-slate-600">Provide details about the civic problem. Our AI will automatically route it to the correct department.</p>
      </div>

      <div className="glass-card overflow-hidden flex flex-col md:flex-row">
        
        <div className="flex-1 p-8 bg-white">
          {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="form-label">Full Name</label>
                <input type="text" name="name" className="form-input" required onChange={handleChange} />
              </div>
              <div>
                <label className="form-label">Email Address</label>
                <input type="email" name="email" className="form-input" required onChange={handleChange} />
              </div>
            </div>

            <div>
              <label className="form-label">Issue Title</label>
              <input type="text" name="title" className="form-input" required onChange={handleChange} placeholder="Brief description of the problem" />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="form-label">Location</label>
                <input type="text" name="location" className="form-input" required onChange={handleChange} placeholder="Address or landmark" />
              </div>
              <div>
                <label className="form-label">Category</label>
                <select name="category" className="form-input" onChange={handleChange}>
                  <option value="Roads">Roads & Infrastructure</option>
                  <option value="Water Supply">Water Supply</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Sanitation">Sanitation</option>
                  <option value="Public Safety">Public Safety</option>
                </select>
              </div>
            </div>

            <div>
              <label className="form-label">Detailed Description</label>
              <textarea name="description" className="form-input" rows="4" required onChange={handleChange}></textarea>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-50 transition-colors">
              <UploadCloud size={32} className="mb-2 text-primary-500" />
              <p className="text-sm font-medium">Click to upload evidence photo</p>
              <p className="text-xs">JPG, PNG up to 5MB</p>
            </div>
            
            <button type="submit" className="btn-primary w-full py-3 text-lg mt-4" disabled={loading}>
              {loading ? 'AI Analyzing & Submitting...' : 'Submit to AI Engine'} <ChevronRight size={20} />
            </button>
          </form>
        </div>

        <div className="w-full md:w-80 bg-slate-50 p-8 border-l border-slate-200 flex flex-col">
          <div className="flex items-center gap-2 text-primary-700 font-bold mb-4">
            <Sparkles size={20} /> AI Assistant
          </div>
          <p className="text-sm text-slate-600 mb-6">
            CitizenCare AI analyzes your complaint in real-time. It determines the urgency, sentiment, and automatically notifies the specific department handling your ward.
          </p>
          <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm mt-auto">
            <div className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2">Did you know?</div>
            <p className="text-sm text-slate-700">Providing an exact landmark decreases resolution time by an average of 42%.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NewComplaint;
