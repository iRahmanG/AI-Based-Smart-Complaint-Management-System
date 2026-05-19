import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, User, Phone } from 'lucide-react';
import api from '../api';

const Register = () => {
  const [form, setForm] = useState({ fullName: '', email: '', phoneNumber: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/signup', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-primary-700 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize:'32px 32px'}}></div>
        <div className="relative z-10 text-white text-center p-12">
          <ShieldCheck size={64} className="mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl font-extrabold mb-4">Join CitizenCare</h2>
          <p className="text-indigo-100 text-lg max-w-sm mx-auto">Create your free account and start reporting public issues. Every complaint makes our city better.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 text-primary-600 mb-8 lg:hidden">
            <ShieldCheck size={28} />
            <span className="text-xl font-bold text-slate-900">CitizenCare AI</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">Create your account</h1>
          <p className="text-slate-500 mb-8">Register as a citizen to start filing and tracking complaints.</p>

          {error && <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm mb-6">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="form-label">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center"><User size={16} className="text-slate-400" /></div>
                <input name="fullName" type="text" className="form-input pl-10" placeholder="Jane Doe" onChange={handleChange} required />
              </div>
            </div>
            <div>
              <label className="form-label">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center"><Mail size={16} className="text-slate-400" /></div>
                <input name="email" type="email" className="form-input pl-10" placeholder="jane@example.com" onChange={handleChange} required />
              </div>
            </div>
            <div>
              <label className="form-label">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center"><Phone size={16} className="text-slate-400" /></div>
                <input name="phoneNumber" type="tel" className="form-input pl-10" placeholder="+91 98765 43210" onChange={handleChange} />
              </div>
            </div>
            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center"><Lock size={16} className="text-slate-400" /></div>
                <input name="password" type="password" className="form-input pl-10" placeholder="Min. 8 characters" onChange={handleChange} required />
              </div>
            </div>
            <button type="submit" className="btn-primary w-full py-3" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Free Account'}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            Already have an account? <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
