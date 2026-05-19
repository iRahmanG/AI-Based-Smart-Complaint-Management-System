import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, Globe } from 'lucide-react';
import api from '../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const res = await api.post('/auth/google');
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-indigo-700 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize:'32px 32px'}}></div>
        <div className="relative z-10 text-white text-center p-12">
          <ShieldCheck size={64} className="mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl font-extrabold mb-4">CitizenCare AI</h2>
          <p className="text-blue-100 text-lg max-w-sm mx-auto">Your voice matters. Report civic issues and see them resolved with the power of AI.</p>
          <div className="mt-10 grid grid-cols-3 gap-6 text-center">
            <div><div className="text-3xl font-bold">1.2K+</div><div className="text-blue-200 text-sm mt-1">Issues Resolved</div></div>
            <div><div className="text-3xl font-bold">48h</div><div className="text-blue-200 text-sm mt-1">Avg Resolution</div></div>
            <div><div className="text-3xl font-bold">94%</div><div className="text-blue-200 text-sm mt-1">Satisfaction</div></div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 text-primary-600 mb-8 lg:hidden">
            <ShieldCheck size={28} />
            <span className="text-xl font-bold text-slate-900">CitizenCare AI</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
          <p className="text-slate-500 mb-8">Log in to manage your complaints and track resolutions.</p>

          {error && <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm mb-6">{error}</div>}

          <button onClick={handleGoogleLogin} disabled={loading} className="w-full btn-secondary py-3 mb-6 shadow-sm">
          <Globe size={18} className="text-blue-500" /> Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-slate-400 text-sm">or with email</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="form-label">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center"><Mail size={16} className="text-slate-400" /></div>
                <input type="email" className="form-input pl-10" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="form-label mb-0">Password</label>
                <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">Forgot password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center"><Lock size={16} className="text-slate-400" /></div>
                <input type="password" className="form-input pl-10" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
            </div>
            <button type="submit" className="btn-primary w-full py-3" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            Don't have an account? <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
