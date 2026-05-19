import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Activity, Zap, ChevronRight, UserCircle } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-slate-900">CitizenCare AI</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#features" className="hover:text-primary-600 transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-primary-600 transition-colors">How it Works</a>
              <a href="#testimonials" className="hover:text-primary-600 transition-colors">Testimonials</a>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-primary-600">Log in</Link>
              <Link to="/register" className="btn-primary text-sm px-4 py-2">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-8 border border-indigo-100">
              <Zap size={16} /> Powered by Advanced AI
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-8">
              Smart Complaint Resolution for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Modern Cities</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Register public issues, track progress in real-time, and get instant AI-assisted resolutions. A transparent bridge between citizens and the government.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary text-lg px-8 py-4 shadow-lg shadow-primary-500/30">
                Register a Complaint <ChevronRight size={20} />
              </Link>
              <Link to="/login" className="btn-secondary text-lg px-8 py-4">
                Track Status
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why CitizenCare AI?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Our platform utilizes machine learning to route your complaints directly to the correct department, drastically reducing wait times.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 bg-white">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Instant AI Analysis</h3>
              <p className="text-slate-600 leading-relaxed">Our AI instantly reads your complaint, categorizes it, and assigns a priority level, ensuring urgent matters are flagged immediately.</p>
            </div>
            <div className="glass-card p-8 bg-white">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-6">
                <Activity size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time Tracking</h3>
              <p className="text-slate-600 leading-relaxed">Watch your complaint move through the system with complete transparency. See exactly when it's assigned, reviewed, and resolved.</p>
            </div>
            <div className="glass-card p-8 bg-white">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Automated Routing</h3>
              <p className="text-slate-600 leading-relaxed">No more bouncing between departments. Your complaint is intelligently routed to the exact team capable of fixing it.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2 text-white">
            <ShieldCheck size={24} />
            <span className="text-lg font-bold">CitizenCare AI</span>
          </div>
          <div className="text-sm">
            &copy; 2026 CitizenCare Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
